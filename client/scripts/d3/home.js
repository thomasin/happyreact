// import d3 from 'd3'

export default function streamGraph (request) {
  let data = request.body.data
  var width = document.getElementById('svgContainer').clientWidth
  var height = document.getElementById('svgContainer').clientHeight

  var stack = d3.stack()
    .keys(['energy', 'outlook'])
    .order(d3.stackOrderNone) // Order that data is stacked in
    .offset(d3.stackOffsetWiggle) // Offset from bottom of viewbox

  var series = stack(data)

  var svg = d3.select('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)

  var x = d3.scaleLinear()
    .domain([0, 5]) // The range that the data covers
    .range([0, width]) // The range to transform it to

  var y = d3.scaleLinear()
    .domain([0, 10]) // The max range the data could cover (all ys summed)
    .range([height, 0]) // The height of viewbox

  var z = d3.interpolateCool // Randomise colours

  var area = d3.area() // Area calculations
    .curve(d3.curveCardinal)
    .x(function (d, i) { return x(i) })
    .y0(function (d) { return y(d[0]) })
    .y1(function (d) { return y(d[1]) })

  svg.selectAll('path') // Create physical elements
    .data(series)
    .enter().append('path')
      .attr('d', area)
      .attr('fill', function () { return z(Math.random()) })
}
