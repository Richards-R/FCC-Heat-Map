let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
let req = new XMLHttpRequest();

let json = "";
let graphArr = [];

let yScale
let xScale

let xAxisScale
let yAxisScale

const w = 800
const h = 600
const padding = 40

let svg = d3.select('svg')

let generateScales = () => {
  yScale = d3.scaleLinear()
    .domain([0, d3.max(graphArr, (d) => {
    return d[1]
    })])
    .range([0, h - (2*padding)]);
  
  xScale = d3.scaleLinear()
    .domain([0, (graphArr.length -1)])
    .range([padding, w - padding]);
  
  datesArr = graphArr.map((item) => {
    return new Date(item[0])
    })
  
  xAxisScale = d3.scaleTime()
    .domain([d3.min(datesArr), d3.max(datesArr)])
    .range([padding, w - padding])
  
  yAxisScale = d3.scaleLinear()
    .domain([0, d3.max(graphArr, (d) => {
    return d[1]})])
    .range([h-padding, padding])
    }

let drawCanvas = () => {
  svg.attr("width", w)
  svg.attr("height", h)
  }

let drawBars =()=>{
  svg.selectAll("rect")
    .data(graphArr)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("width", (w - (2*padding)) / graphArr.length)
    .attr("data-date", (item) => {
    return item[0]
    })
    .attr("data-gdp", (item) => {
    return item[1]
    })
    .attr("height", (item) => {
    return yScale(item[1])
    })
    .attr("x", (item, i)=> {
    return xScale(i);
    })
    .attr("y", (item) => {
    return (h - padding) - yScale(item[1])
    })
    .attr("fill", (d, i) => {
      if (i % 2 === 0){
        return "violet"
      }else{
        return "pink"
      }
    })
    .on("mouseover", (event, item)=>{
      drawToolTip.transition()
      .style("visibility", "visible")
      drawToolTip.text(`Date: ${item[0]} Index: ${item[1]}`)
      document.querySelector("#tooltip").setAttribute("data-date", item[0])
    })
    .on("mouseout", (event, item) => {
      drawToolTip.transition()
      .style("visibility", "hidden")
    })
}

let generateAxes=()=>{

  let xAxis = d3.axisBottom(xAxisScale);
  let yAxis = d3.axisLeft(yAxisScale);

  svg.append("g")
    .call(xAxis)
    .attr("transform", "translate(0," + (h - padding) + ")")
    .attr('id','x-axis')

  svg.append("g")
    .call(yAxis)
    .attr("transform", "translate (" + (padding) + ", 0)")
    .attr('id','y-axis')
}

req.open("GET", url, true);
req.onload = () => {
  json = JSON.parse(req.responseText)
  graphArr = json.data
  drawCanvas()
  generateScales()
  drawBars()
  generateAxes()
};
req.send();

let drawToolTip = d3.select("body")
  .append("div")
  .attr("id", "tooltip" )
  .attr("x","40" )
  .attr("y", "50%")
  .style("width", "auto")
  .style("height", "auto")
  .style("visibility", "hidden")
  
