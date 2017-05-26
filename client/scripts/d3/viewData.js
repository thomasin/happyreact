import moment from 'moment'

export default function createGraphs(request) {
  var {data, variableList} = request.body

  if (data.length < 2) {
    d3.select("#legendRow").append("div")
      .attr("class", "preGraphNotes title")
      .html("Exciting!<br>Once you have two or more entries your data will be displayed here (-:<br>Check back when that happens")
  } else {
    variableList.push("energy")
    variableList.push("outlook")
    var parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S")

    var xScaleDomainMin = parseTime(moment.max(moment(`${data[0].date} +0000`, "YYYY-MM-DD kk:mm:ss ZZ").local(), moment(`${data[data.length-1].date} +0000`, "YYYY-MM-DD kk:mm:ss ZZ").local().subtract(1, "week")).format("YYYY-MM-DD kk:mm:ss"))
    console.log(xScaleDomainMin)
    data.forEach((row) => {
      row.date = parseTime(moment(`${row.date} +0000`, "YYYY-MM-DD kk:mm:ss ZZ").local().format("YYYY-MM-DD kk:mm:ss"))
    })

    var margin = {top: 20, right: 0, bottom: 50, left: 0}
    var width = document.getElementById("svgContainer").clientWidth
    var height = document.getElementById("svgContainer").clientHeight

    var xScaleMax = d3.max(data, function(d) { return d.date; })
    var xScaleMin = d3.min(data, function(d) { return d.date; })

    var xScale = d3.scaleTime()
        .range([0, width])
        .domain(d3.extent(data, function(d) { return d.date; }))

    var zoom = d3.zoom()
      .scaleExtent([1, 5])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on("zoom", redrawChart)

      var svg = d3.select("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .call(zoom)

    var g = svg.append("g")
      .attr("transform",
            "translate(" + margin.left + ","+ margin.top + ")")

    svg.transition()
      .duration(1500)
      .call(zoom.transform, d3.zoomIdentity
        .scale(width / (xScale(xScaleMax) - xScale(xScaleDomainMin)))
        .translate(-xScale(xScaleDomainMin), 0))

    var colourScale = d3.scaleLinear()
      .range([0, 1])
      .domain([0, variableList.length])

    var panExtent = { x: d3.extent(data, function(d) { return d.date; }) }

    var z = d3.interpolateRainbow // Function to vary the line colours
    var yScale = {}
    var valueLines = {}

    function setYScale(variable, i) {
      yScale[`y${i}`] = d3.scaleLinear() // Define y scale
        .range([(height - margin.top - margin.bottom), 0])
        .domain(d3.extent(data, (d) => d[variable]))
    }

    function createValueLine(variable, i) {
      valueLines[`l${i}`] = d3.line() // Define corresponding curve
        .curve(d3.curveMonotoneX)
        .x(function(d) { return xScale(d.date)} )
        .y(function(d) { return yScale[`y${i}`](d[variable])})
    }

    function drawPath(variable, i) {
      g.append("path") // Draw line for that curve
        .data([data])
        .attr("stroke", z(colourScale(i)))
        .attr("id", `line${i}`)
        .attr("d", valueLines[`l${i}`])
        .attr("stroke-width", "2")
        .attr("fill", "none")
    }

    var legendSpace = legendSpace = width/variableList.length
    var activeObj = {}
    var legendContainer = d3.select(".legendRow")

    variableList.forEach((variable, i) => {
      setYScale(variable, i)
      createValueLine(variable, i)
      drawPath(variable, i)
      addLegend(variable, i)
    })

    function addLegend(variable, i) {
      legendContainer.append("div")
        .attr("class", "legend")
        .attr("id", `legend-${i}`)
        .style("color", z(colourScale(i)))
        .text(variable)
        .on("click", () => {
          var active = activeObj[i] ? false : true
          var newOpacity = active ? 0 : 1
          g.select(`#line${i}`)
            .transition().duration(500)
            .style("opacity", newOpacity)
          d3.select(`#legend-${i}`)
            .classed("faded", active)
          activeObj[i] = active
        })
        .on("mouseover", () => {
          g.select(`#line${i}`)
            .attr("stroke", '#000')
        })
        .on("mouseout", () => {
          g.select(`#line${i}`)
            .attr("stroke", z(colourScale(i)))
        })
    }

    var gAx = g.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + (height-margin.top-margin.bottom + 5) + ")")
        .call(d3.axisBottom(xScale))

    function redrawChart() {
      var t = d3.event.transform, xt = t.rescaleX(xScale)
      var xAxis = d3.axisBottom(xScale).scale(xt)
      gAx.call(xAxis)
      variableList.forEach((variable, i) => {
        // valueLines[`l${i}`]
        g.select(`#line${i}`).attr("d", valueLines[`l${i}`].x(function(d) { return xt(d.date)}))
      })
    }
  }
}
