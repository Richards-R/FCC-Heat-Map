let json;

let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';
json = new XMLHttpRequest();
json.open("GET", url, true);
json.send();
json.responseType = "json";

let newArr =[]
json.onload = () => {
  if (json.readyState == 4 && json.status == 200) {
    json = json.response;
    
console.log(json.monthlyVariance)
  } else {
    console.log(`Error: ${json.status}`);
  }
  newArr = json.monthlyVariance.slice()
  console.log(newArr)
  console.log(json.monthlyVariance.length)
  document.getElementById("div").innerHTML = json[1]
}





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

