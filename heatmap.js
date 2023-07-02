let json;
let dataObj = {};
let data = [];
let varianceArr = [];
let varianceResultArr = [8.66];
let varData = [];
let yearArr = [];
let degreeHeat = 0;

let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';
json = new XMLHttpRequest();
json.open("GET", url, true);
json.send();
json.responseType = "json";

let newArr =[]
json.onload = () => {
  if (json.readyState == 4 && json.status == 200) {
    json = json.response;
  } else {
    console.log(`Error: ${json.status}`);
  }
dataObj = json.monthlyVariance
console.log(json.monthlyVariance.length)
console.log(dataObj[1].year)
  //document.getElementById("div").innerHTML = dataObj[1].year
  drawRects()
  generateScales()
  generateAxes()
  //generateLegend()
}

const w = 1500
const h = 600
const padding = 125

var div = d3.select('body')
  .append('div')
  .attr('class', 'tooltip')
  .attr('id', 'tooltip')
  .style('opacity', 0);

d3.select('svg')
  .attr("width", w)
  .attr("height", h)
 
// d3.select('g')
// .attr("transformx" ,"50%")

const drawRects = () => {

data = json.monthlyVariance
  console.log(data)
  console.log(json.baseTemperature)
  
for (let i=0; i<data.length; i++){
  varianceArr.push(data[i].variance)
}

for (let i=0; i<varianceArr.length; i++){
  varianceResultArr.push(json.baseTemperature + varianceArr[i])
}

varianceResultArr.shift()



  d3.select(".blocks")
  .selectAll("rect")
  .data(data)
  .join("rect")
  .attr("class", "cell")
  .attr("width", 4)
  .attr("height", 30)
  .attr("x", ((d)=> padding*2 + (d.year - 1752) * 4))
  .attr("y", ((d)=> padding/2 + (d.month * 30)))
  .attr("fill", ((d, i) => varianceResultArr[i] < 3 ? "#483D8B" :
                           varianceResultArr[i] < 4 ? "#4682B4" :
                           varianceResultArr[i] < 5 ? "#5F9EA0" :
                           varianceResultArr[i] < 6 ? "#66CDAA" :
                           varianceResultArr[i] < 7 ? "#EEE8AA" :
                           varianceResultArr[i] < 8 ? "#FFD700" :
                           varianceResultArr[i] < 9 ? "#FF4500" :
                           varianceResultArr[i] < 10 ? "#DC143C" :
                           varianceResultArr[i] < 11 ? "#FF6347" :
                           varianceResultArr[i] < 12 ? "#8B0000" : "#800000"
                                          ))

  .attr("data-month", ((d)=> (d.month -= 1)))
  .attr("data-year",  ((d)=> (d.year)))
  .attr("data-temp",  degreeHeat = () => ((d, i) => varianceResultArr[i] ))
  .on('mouseover', ((event, item)=>{
    div.style('opacity', 0.9);
    div.attr('data-year',  [item][0].year)
    div.html(
      JSON.stringify([item][0].year))
      .style('left', event.pageX + 50 + 'px')
      .style('top', event.pageY - 28 + 'px')
  }))

  .on('mouseout', function () {
    div.style('opacity', 0);
  })
}

const generateScales = () => {
 for (let i=0; i<data.length; i++){
    yearArr.push(i+1753)
  };
  console.log(yearArr)   
  
  let monthArr = ["January","February","March","April","May","June","July",
  "August","September","October","November","December"];
  
  let numArr =[ 1,  2,  3 , 4 , 5,  6,  7,  8,  9, 10, 11, 12]

  console.log(numArr)   

  // xAxisScale = d3.scaleTime()
  //   .domain([new Date(1753,0,31),new Date(2014,11,31)])
  //   .range([padding+6, padding+6+1048])

    xAxisScale = d3.scaleLinear()
    .domain([Number(1753), Number(2015)])
    .range([padding+4, padding+4+1048])
  
  yAxisScale = d3.scaleTime()
    .domain([new Date(2023, 0, 1), new Date(2023, 10, 31)])
    .range([padding+15, h-padding-5])
}

const  generateAxes = () =>{
  let xAxis = d3.axisBottom(xAxisScale)
                .tickFormat(d3.format("d"));

  let yAxis = d3.axisLeft(yAxisScale)
                .tickFormat(d3.timeFormat("%B"))

d3.select("svg")
  .append("g")
    .call(xAxis)
    .attr("stroke","brown")
    .attr("transform", "translate (" + padding +", "+ (h - padding-22) + ")")
    .attr('id','x-axis')

  .append("g")
    .call(yAxis)
    .attr("transform", "translate ("+ padding +", -485)")
    .attr('id','y-axis')
}

legendAxisScale = d3.scaleLinear()
    .domain([2,12]).nice()
    .range([0, 200])

let legendAxis = d3.axisBottom(legendAxisScale)
    .tickFormat(d3.format("d"))

    d3.select("svg")
    .append("g")
    .call(legendAxis)
    .attr("transform", "translate (300, 520)")
    .attr('id','l-axis')





