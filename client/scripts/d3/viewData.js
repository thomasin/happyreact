import moment from 'moment'
// import d3 from 'd3'

export default function createGraphs (res) {
  let {data, variableList} = res

    // Initialise
  let initialVars = ['energy', 'outlook']
  let variables = [...variableList, ...initialVars]
  let initialZoomX = setTime(data) // Parse the times in the date column, set initial zoom for X
  let dim = setDimensions() // Set dimensions for graph viewport
  let { xScale, xScaleMax } = setScaleX(data, dim.width) // Set x scale
  let zoom = createZoom(dim, redrawChart) // Set zoom function and boundaries
  let g = createContainers(dim, zoom, xScale, xScaleMax, initialZoomX) // Set countainers and groups for elements
  let c = setColourScale(variables) // Set colour scale to map to graph paths and legends
  let gAx = drawAxis(g, dim) // Draw axis
  let yScale = {} // Initialise objects
  let valueLines = {}
  let areaMap = {}
  let activeObj = {}
  let legendContainer = d3.select('.legendRow')

    // Draw
  variables.forEach((variable, i) => {
    activeObj[i] = !initialVars.includes(variable)
    setScaleY(variable, i, yScale, dim, data)
    createValueLine(variable, i, xScale, yScale, valueLines, data)
    createArea(variable, i, xScale, yScale, areaMap, dim.height, data)
    drawPath(variable, i, g, c, valueLines, activeObj, data)
    drawArea(variable, i, g, c, areaMap, activeObj, data)
    addLegend(variable, i, g, c, legendContainer, activeObj, initialVars, data)
  })

  function redrawChart () {
    let t = d3.event.transform
    let xt = t.rescaleX(xScale)
    let xAxis = d3.axisBottom(xt).ticks(5)
    gAx.call(xAxis)
    variables.forEach((variable, i) => {
        // valueLines[`l${i}`]
      g.select(`#line${i}`).attr('d', valueLines[`l${i}`].x(function (d) { return xt(d.date) }))
      g.select(`#area${i}`).attr('d', areaMap[`l${i}`].x(function (d) { return xt(d.date) }))
    })
  }
}

// Initialise

function setTime (data) {
  let parseTime = d3.timeParse('%Y-%m-%d %H:%M:%S')
  data.forEach((row) => {
    row.date = parseTime(moment(`${row.date} +0000`, 'YYYY-MM-DD kk:mm:ss ZZ').local().format('YYYY-MM-DD kk:mm:ss'))
  })
  return parseTime(moment.max(moment(data[0].date, 'YYYY-MM-DD kk:mm:ss'), moment(data[data.length - 1].date, 'YYYY-MM-DD kk:mm:ss').subtract(1, 'week')).format('YYYY-MM-DD kk:mm:ss'))
}

function setDimensions () {
  const margin = {top: 20, right: 0, bottom: 50, left: 0}
  const width = document.getElementById('svgContainer').clientWidth
  const height = document.getElementById('svgContainer').clientHeight
  return { width, height, margin }
}

function setScaleX (data, width) {
  let xScaleMax = d3.max(data, function (d) { return d.date })
  let xScale = d3.scaleTime()
      .range([0, width])
      .domain(d3.extent(data, function (d) { return d.date }))
  return { xScale, xScaleMax }
}

function setScaleY (variable, i, yScale, dim, data) {
  yScale[`y${i}`] = d3.scaleLinear() // Define y scale
    .range([(dim.height - dim.margin.top - dim.margin.bottom), 0])
    .domain(d3.extent(data, (d) => d[variable]))
}

function createContainers (dim, zoom, xScale, xScaleMax, initialZoomX) {
  let { width, height, margin } = dim
  let svg = d3.select('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .call(zoom)

  let g = svg.append('g')
    .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')')

  svg.transition()
    .duration(1500)
    .call(zoom.transform, d3.zoomIdentity
    .scale(width / (xScale(xScaleMax) - xScale(initialZoomX)))
    .translate(-xScale(initialZoomX), 0))

  return g
}

function createZoom (dim, redrawChart) {
  let { width, height } = dim
  return d3.zoom()
    .scaleExtent([1, 3])
    .translateExtent([[0, 0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on('zoom', redrawChart)
}

function setColourScale (variables) {
  let colourScale = d3.scaleLinear()
    .range([0, 1])
    .domain([0, variables.length])

  let z = d3.interpolateRainbow
  return { z, colourScale }
}

// Draw

function createValueLine (variable, i, xScale, yScale, valueLines, data) {
  valueLines[`l${i}`] = d3.line() // Define corresponding curve
    .curve(d3.curveMonotoneX)
    .x(function (d) { return xScale(d.date) })
    .y(function (d) { return yScale[`y${i}`](d[variable]) })
}

function createArea (variable, i, xScale, yScale, areaMap, height, data) {
  areaMap[`l${i}`] = d3.area()
    .x(function (d) { return xScale(d.date) })
    .y0(height)
    .y1(function (d) { return yScale[`y${i}`](d[variable]) })
}

function drawPath (variable, i, g, c, valueLines, activeObj, data) {
  g.append('path') // Draw line for that curve
    .data([data])
    .attr('stroke', c.z(c.colourScale(i)))
    .attr('id', `line${i}`)
    .attr('d', valueLines[`l${i}`])
    .attr('stroke-width', '2')
    .attr('fill', 'none')
    .style('opacity', () => {
      return activeObj[i] ? 0 : 1
    })
}

function drawArea (variable, i, g, c, areaMap, activeObj, data) {
  g.append('path') // Draw line for that curve
    .data([data])
    .attr('fill', c.z(c.colourScale(i)))
    .attr('id', `area${i}`)
    .attr('d', areaMap[`l${i}`])
    .attr('stroke-width', '0')
    .attr('stroke', 'none')
    .style('opacity', () => {
      return activeObj[i] ? 0 : 0.2
    })
}

function addLegend (variable, i, g, c, legendContainer, activeObj, startVars, data) {
  legendContainer.append('div')
    .attr('class', (d) => {
      return startVars.includes(variable) ? 'legend' : 'legend faded'
    })
    .attr('id', `legend-${i}`)
    .style('color', c.z(c.colourScale(i)))
    .text(variable)
    .on('click', () => {
      legendClick(i, g, activeObj)
    })
    .on('mouseover', () => {
      legendHover(i, g, c, true)
    })
    .on('mouseout', () => {
      legendHover(i, g, c, false)
    })
}

function legendClick (i, g, activeObj) {
  activeObj[i] = !activeObj[i]
  changeOpacity(i, g, activeObj, 'area')
  changeOpacity(i, g, activeObj, 'line')
  d3.select(`#legend-${i}`)
    .classed('faded', activeObj[i])
}

function changeOpacity (i, g, activeObj, type) {
  g.select(`#${type}${i}`)
    .transition().duration(500)
    .style('opacity', () => activeObj[i] ? 0 : type === 'area' ? 0.2 : 0.5)
}

function legendHover (i, g, c, mouseAction) {
  g.select(`#line${i}`)
    .attr('stroke', () => mouseAction ? '#000' : c.z(c.colourScale(i)))
}

function drawAxis (g, dim) {
  return g.append('g')
      .attr('class', 'xAxis title')
      .attr('transform', 'translate(0,' + (dim.height - dim.margin.top - dim.margin.bottom + 5) + ')')
      .attr('stroke-width', '0')
}
