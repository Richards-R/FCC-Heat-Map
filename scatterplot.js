let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
let req = new XMLHttpRequest();

let json = "";
let scattArr = [];
let yearArr = [];
let totalSecondsArr = [];
let timeArr = [];
let dotArr = [];
let tooltipArr = [];

let xScale;
let yScale;

let xAxisScale;
let yAxisScale;

const w = 600;
const h = 500;
const padding = 50;

var div = d3
  .select('body')
  .append('div')
  .attr('class', 'tooltip')
  .attr('id', 'tooltip')
  .style('opacity', 0);

const svg = d3.select('svg')
  .attr("width", w)
  .attr("height", h)

req.open("GET", url, true);
req.onload = () => {
  json = JSON.parse(req.responseText)

  for (let i=0; i<json.length; i++){
  scattArr.push([json[i].Year, json[i].Time, !json[i].Doping, json[i].Name, json[i].Nationality, json[i].Doping])}

  generateScales()
  generateAxes()
  drawDots()
  generateLegend()
  };

req.send();

const generateScales = () => {
  yearArr = scattArr.map((item) => {
    return (item[0])
    });                                                  

  timeArr = scattArr.map((item) => {
    return (item[1]).split(":")
    });
                                  
  totalSecondsArr = (timeArr.map((item) => {
    return (parseInt(item[0]) *60)+(parseInt(item[1]))
    }))
   
  xScale = d3.scaleLinear()
    .domain([0, (yearArr.length -1)])
    .range([padding, w - padding]);

   yScale = d3.scaleLinear()
      .domain([0, d3.max(totalSecondsArr)])
      .range([0, h - (2*padding)]);
              
  for (let i=0; i<json.length; i++){
    dotArr.push([scattArr[i][0], totalSecondsArr[i], scattArr[i][2], scattArr[i][1], scattArr[i][3], scattArr[i][4], scattArr[i][5]])}  

  xAxisScale = d3.scaleLinear()
    .domain([d3.min(yearArr)-1, d3.max(yearArr)+1])
    .range([padding, w - padding])
  
  yAxisScale = d3.scaleLinear()
    .domain([d3.max(totalSecondsArr), d3.min(totalSecondsArr)])
    .range([h-padding, padding])
}

const  generateAxes = () =>{
  let xAxis = d3.axisBottom(xAxisScale)
                .tickFormat(d3.format("d"));
  let yAxis = d3.axisLeft(yAxisScale)
                .tickFormat(x => (x % 60) !== 0 ? `${Math.floor(x/60)}`+ ":" + `${(x-(Math.floor(x/60)*60))}` : `${Math.floor(x/60)}`+ ":00")

  svg.append("g")
    .call(xAxis)
    .attr("transform", "translate(0," + (h - padding) + ")")
    .attr('id','x-axis')

  svg.append("g")
    .call(yAxis)
    .attr("transform", "translate (" + (padding) + ", 0)")
    .attr('id','y-axis')
}

const drawDots = () => {
  svg.selectAll("dots")
    .data(dotArr)
    .join("circle")
    .attr("class", "dot")
    .attr("r", "5px")
    .attr("cx",  (d)=>(xAxisScale(d[0])))
    .attr("data-xvalue", (d)=>(d[0]))
    .attr("cy",  (d)=>((yAxisScale(d[1]))))
    .attr("data-yvalue",  (d)=>(new Date(d[1] * 1000)))
    .attr("fill", (d)=> d[2] === false ? "url(#dopeGrad)" : "url(#cleanGrad)")

    .on('mouseover', function (event, item) {
      div.style('opacity', 0.9);
      div.attr('data-year',  item[0]);
      div
        .html(
          item[4] +
            ': ' +
            item[5]  +
            '<br/>' +
            'Year: ' +
            item[0] +
            ', Time: ' +
            item[3] +
            (item[6] ? '<br/>' + item[6] : '')
        )
        .style('left', event.pageX + 'px')
        .style('top', event.pageY - 28 + 'px');
    })
    .on('mouseout', function () {
      div.style('opacity', 0);
    });
}

let generateLegend = () => {
  svg.append("rect")
    .attr("width", "205px")
    .attr("height", "54px")
    .attr("x", "380px")
    .attr("y", "180px")
    .attr("fill", "none")
    .attr("stroke", "silver")
    .attr("id", "legend")
}









    
