let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
let req = new XMLHttpRequest()

let baseTemp;
let dataArr =[]
let varianceArr=[]
let varianceResultArr=[]

let xScale;
let yScale;

let xAxis;
let yAxis; 

let width = 1200
let height = 600
let padding = 70

let svg = d3.select('svg')
let tooltip = d3.select('#tooltip')

let generateScales = () => {
  let minYear = d3.min(dataArr, (item) => item['year'])
  let maxYear = d3.max(dataArr, (item) => item['year'])

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
  for (let i=0; i<dataArr.length; i++){
    varianceArr.push(dataArr[i].variance)
  }

  for (let i=0; i<varianceArr.length; i++){ 
    varianceResultArr.push(baseTemp + varianceArr[i])
  }

  varianceResultArr.shift()
  
    svg.selectAll('#blocks')
        .data(dataArr)
        .join('rect')
        .attr('class','cell')
        .attr("fill", ((d, i) => 
          baseTemp + d['variance'] < 2 ? "black" :
          baseTemp + d['variance'] < 3 ? "#483D8B" :
          baseTemp + d['variance'] < 4 ? "#4682B4" :
          baseTemp + d['variance'] < 5 ? "#5F9EA0" :
          baseTemp + d['variance'] < 6 ? "#66CDAA" :
          baseTemp + d['variance'] < 7 ? "#EEE8AA" :
          baseTemp + d['variance'] < 8 ? "#FFD700" :
          baseTemp + d['variance'] < 9 ? "#FF6347" :
          baseTemp + d['variance'] < 10 ? "#DC143C" :
          baseTemp + d['variance'] < 11 ? "#FF4500" :
          baseTemp + d['variance'] < 12 ? "brown" : 
          "#8B0000"
        ))
        .attr('data-year', (item) => item['year'])
        .attr('data-month', (item) => item['month'] - 1)
        .attr('data-temp', (item) => baseTemp + item['variance'])
        .attr('width', (item) => {
          let minYear = d3.min(dataArr, (item) => item['year'])            
          let maxYear = d3.max(dataArr, (item) => item['year'])
          let yearCount = maxYear - minYear
          return (width - (2 * padding)) / yearCount
      })
        .attr('height', (item)=> (height - (2 * padding)) / 12)
        .attr('x', (item) => xScale(item['year']))
        .attr('y', (item) => yScale(new Date(0, item['month']-1, 0, 0, 0, 0, 0)))
        

        .on('mouseover', (event,item) => {
            tooltip.style('visibility', 'visible')
                    .attr('data-year', parseInt(item['year']))
                    .style('left', event.pageX + 40 + 'px')
                    .style('top', event.pageY - 28 + 'px')
            
            let monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"]
        
            tooltip.html(monthNames[item['month'] -1 ] + ' '
             + item['year']+ ' <br> Avg temp. '
             + (baseTemp + item['variance']).toPrecision(3))             
        })
        .on('mouseout', (event, item) => {
            tooltip.style('visibility', 'hidden')
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
}

req.open('GET', url, true)
req.onload = () => {
    let data = JSON.parse(req.responseText)
    baseTemp = data.baseTemperature
    dataArr = data.monthlyVariance
    console.log(baseTemp)
    console.log(dataArr)
    drawCanvas()
    generateScales()
    drawCells()
    generateAxes()
}
req.send()

legendAxisScale = d3.scaleLinear()
    .domain([1,13]).nice()
    .range([0, 240])

let legendAxis = d3.axisBottom(legendAxisScale)
    .tickFormat(d3.format("d"))
  
  d3.select("svg")
    .append("g")
    .call(legendAxis)
    .attr("transform", "translate (60, 580)")
    .attr('id','l-axis')