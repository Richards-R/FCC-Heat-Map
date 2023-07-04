let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
let req = new XMLHttpRequest()

let baseTemp
let values =[]

let xScale
let yScale

let xAxis
let yAxis

let width = 1200
let height = 600
let padding = 60

let svg = d3.select('svg')
let tooltip = d3.select('#tooltip')

let generateScales = () => {

    let minYear = d3.min(values, (item) => {
        return item['year']
    })
    
    let maxYear = d3.max(values, (item) => {
        return item['year']
    })

    xScale = d3.scaleLinear()
                .domain([minYear, maxYear + 1])
                .range([padding, width - padding])

    yScale = d3.scaleTime()
                .domain([new Date(0,0,0,0, 0, 0, 0), new Date(0,12,0,0,0,0,0)])
                .range([padding, height - padding])
}

let drawCanvas = () => {
    svg.attr('width', width)
    svg.attr('height', height)
}

let drawCells = () => {

    svg.selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('class','cell')
        .attr('fill', (item) => {
            let variance = item['variance']
            if(variance <= -1){
                return 'SteelBlue'
            }else if(variance <= 0){
                return 'LightSteelBlue'
            }else if(variance <= 1){
                return 'Orange'
            }else{
                return 'Crimson'
            }
        })
        .attr('data-year', (item) => {
            return item['year']
        })
        .attr('data-month', (item) => {
            return item['month'] - 1
        })
        .attr('data-temp', (item) => {
            return baseTemp + item['variance']
        })
        .attr('height', (item)=> {
            return (height - (2 * padding)) / 12
        })
        .attr('y', (item) => {
            return yScale(new Date(0, item['month']-1, 0, 0, 0, 0, 0))
        })
        .attr('width', (item) => {

            let minYear = d3.min(values, (item) => {
                return item['year']
            })
            
            let maxYear = d3.max(values, (item) => {
                return item['year']
            })

            let yearCount = maxYear - minYear

            return (width - (2 * padding)) / yearCount
        })
        .attr('x', (item) => {
            return xScale(item['year'])
        })
        .on('mouseover', (event,item) => {
            tooltip.transition()
                   .style('visibility', 'visible')
                   .attr('data-year', item['year'])
            
            let monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
            ]
        
            tooltip.text(item['year'] + ' ' + monthNames[item['month'] -1 ] + ' : ' + item['variance'])

            
        })
        .on('mouseout', (event, item) => {
            tooltip.transition()
                .style('visibility', 'hidden')
        })
        
}

let generateAxes = () => {

    let xAxis = d3.axisBottom(xScale)
                    .tickFormat(d3.format('d'))

    let yAxis = d3.axisLeft(yScale)
                    .tickFormat(d3.timeFormat('%B'))

    svg.append('g')
        .call(xAxis)
        .attr('id','x-axis')
        .attr('transform', 'translate(0, ' + (height-padding) + ')')

    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ', 0)')
    
    svg.append('g')
        
        .attr('id', 'legend')
        

}

req.open('GET', url, true)
req.onload = () => {
    let data = JSON.parse(req.responseText)
    baseTemp = data.baseTemperature
    values = data.monthlyVariance
    console.log(baseTemp)
    console.log(values)
    drawCanvas()
    generateScales()
    drawCells()
    generateAxes()
    
}
req.send()



// let json;
// let dataObj = {};
// let data = [];
// let varianceArr = [];
// let varianceResultArr = [8.66];
// let varData = [];
// let yearArr = [];
// let degreeHeat = 0;

// let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';
// json = new XMLHttpRequest();
// json.open("GET", url, true);
// json.send();
// json.responseType = "json";

// let newArr =[]
// json.onload = () => {
//   if (json.readyState == 4 && json.status == 200) {
//     json = json.response;
//   } else {
//     console.log(`Error: ${json.status}`);
//   }
// dataObj = json.monthlyVariance
// console.log(json.monthlyVariance.length)
// console.log(dataObj[1].year)
//   //document.getElementById("div").innerHTML = dataObj[1].year
//   drawRects()
//   generateScales()
//   generateAxes()
//   //generateLegend()
// }

// const w = 1500
// const h = 600
// const padding = 125

// var div = d3.select('body')
//   .append('div')
//   .attr('class', 'tooltip')
//   .attr('id', 'tooltip')
//   .style('opacity', 0);

// d3.select('svg')
//   .attr("width", w)
//   .attr("height", h)
 
// // d3.select('g')
// // .attr("transformx" ,"50%")

// const drawRects = () => {

// data = json.monthlyVariance
//   console.log(data)
//   console.log(json.baseTemperature)
  
// for (let i=0; i<data.length; i++){
//   varianceArr.push(data[i].variance)
// }

// for (let i=0; i<varianceArr.length; i++){
//   varianceResultArr.push(json.baseTemperature + varianceArr[i])
// }

// varianceResultArr.shift()



//   d3.select(".blocks")
//   .selectAll("rect")
//   .data(data)
//   .join("rect")
//   .attr("class", "cell")
//   .attr("width", 4)
//   .attr("height", 30)
//   .attr("x", ((d)=> padding*2 + (d.year - 1752) * 4))
//   .attr("y", ((d)=> padding/2 + (d.month * 30)))
//   .attr("fill", ((d, i) => varianceResultArr[i] < 3 ? "#483D8B" :
//                            varianceResultArr[i] < 4 ? "#4682B4" :
//                            varianceResultArr[i] < 5 ? "#5F9EA0" :
//                            varianceResultArr[i] < 6 ? "#66CDAA" :
//                            varianceResultArr[i] < 7 ? "#EEE8AA" :
//                            varianceResultArr[i] < 8 ? "#FFD700" :
//                            varianceResultArr[i] < 9 ? "#FF4500" :
//                            varianceResultArr[i] < 10 ? "#DC143C" :
//                            varianceResultArr[i] < 11 ? "#FF6347" :
//                            varianceResultArr[i] < 12 ? "#8B0000" : "#800000"
//                                           ))

//   .attr("data-month", ((d)=> (d.month -= 1)))
//   .attr("data-year",  ((d)=> (d.year)))
//   .attr("data-temp",  degreeHeat = () => ((d, i) => varianceResultArr[i] ))
//   .on('mouseover', ((event, item)=>{
//     div.style('opacity', 0.9);
//     div.attr('data-year',  [item][0].year)
//     div.html(
//       JSON.stringify([item][0].year))
//       .style('left', event.pageX + 40 + 'px')
//       .style('top', event.pageY - 28 + 'px')
//   }))

//   .on('mouseout', function () {
//     div.style('opacity', 0);
//   })
// }

// const generateScales = () => {
 
//   for (let i=0; i<data.length; i++){
//     yearArr.push(data[i].year)
//   };
//   console.log(yearArr[1])   
  
//   let monthArr = ["January","February","March","April","May","June","July",
//   "August","September","October","November","December"];
  
//   let numArr =[ 1,  2,  3 , 4 , 5,  6,  7,  8,  9, 10, 11, 12]

//   console.log(numArr)   

//   // xAxisScale = d3.scaleTime()
//   //   .domain([new Date(1750,0,31),new Date(2016,11,31)])
//   //   .range([padding-8, padding+12+1048])

//   //  xAxisScale = d3.scaleTime()
//   //   .domain([d3.min(yearArr), d3.max(yearArr)])
//   //   .range([padding+5, padding+5+1048])

//     xAxisScale = d3.scaleLinear()
//     .domain([d3.min(yearArr), d3.max(yearArr)])
//     .range([padding+6, padding+6+1048])
  
  
//   yAxisScale = d3.scaleTime()
//     .domain([new Date(2023, 0, 1), new Date(2023, 10, 31)])
//     .range([padding+15, h-padding-5])
// }

// const  generateAxes = () =>{
//   let xAxis = d3.axisBottom(xAxisScale)
//                 .tickFormat(d3.format('d'))
//                 .ticks(30);

//   let yAxis = d3.axisLeft(yAxisScale)
//                 .tickFormat(d3.timeFormat("%B"))

// d3.select("svg")
//   .append("g")
//     .call(xAxis)
//     .attr("stroke","brown")
//     .attr("transform", "translate (" + padding +", "+ (h - padding-22) + ")")
//     .attr('id','x-axis')

//   .append("g")
//     .call(yAxis)
//     .attr("transform", "translate ("+ padding +", -485)")
//     .attr('id','y-axis')
// }

// legendAxisScale = d3.scaleLinear()
//     .domain([2,12]).nice()
//     .range([0, 200])

// let legendAxis = d3.axisBottom(legendAxisScale)
//     .tickFormat(d3.format("d"))

//     d3.select("svg")
//     .append("g")
//     .call(legendAxis)
//     .attr("transform", "translate (300, 520)")
//     .attr('id','l-axis')




