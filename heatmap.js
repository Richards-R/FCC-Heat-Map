let json;
let dataObj = {}

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
  document.getElementById("div").innerHTML = dataObj[1].year
}

const w = 800;
const h = 500;
const padding = 50;

let data = json.monthlyVariance

let svg = d3.select('body')
  .data("data")
  .join()
  .append('div')
  .attr("fill", "blue")
  .attr("width", w)
  .attr("height", h)







  // for (let i=0; i<json.length; i++){
  // scattArr.push([json[i].Year, json[i].Time, !json[i].Doping, json[i].Name, json[i].Nationality, json[i].Doping])}

  // generateScales()
  // generateAxes()
  // drawDots()
  // generateLegend()


// let json = "";
// let scattArr = [];
// let yearArr = [];
// let totalSecondsArr = [];
// let timeArr = [];
// let dotArr = [];
// let tooltipArr = [];

