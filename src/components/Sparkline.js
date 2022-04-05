import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {  Box } from '@mui/material';

const makeOptions = (inData, colorScaleType = 'percent') => {
  const breakpointsAbsolute= [-80, -60, -40, -20, 0, 20, 40, 60, 8000]
  const colorsAbsolute =   ['#4a9a83', '#74ae9c', '#9bc1b4', '#c2d5ce', '#e8e8e8', '#eac8c8', '#e9a8a8', '#e5888a', '#de656d']
  const colorZonesAbsolute = breakpointsAbsolute.map((curr, i)=>{
    return{value: curr, color: colorsAbsolute[i]}
  })
  const breakpointsPercent= [50, 70, 90, 110, 130, 150, 300]
  const colorsPercent =   ['#d43d51','#e5888a','#eac8c8','#e8e8e8','#74ae9c','#4a9a83','#00876c',]

  const colorZonesPercent = breakpointsPercent.map((curr, i)=>{
    return{value: curr, color: colorsPercent[i]}
  })

  const colorZones = colorScaleType === 'absolute' ? colorZonesAbsolute : colorZonesPercent
  return {
    chart: {
      backgroundColor: null,
      borderWidth: 0,
      type: 'column',
      margin: [2, 0, 2, 0],
      width: 120,
      height: 30,
      style: {
        overflow: 'visible'
      },

      // small optimalization, saves 1-2 ms each sparkline
      skipClone: true
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    xAxis: {
      labels: {
        enabled: false
      },
      title: {
        text: null
      },
      startOnTick: false,
      endOnTick: false,
      tickPositions: []
    },
    yAxis: {
      endOnTick: false,
      startOnTick: false,
      labels: {
        enabled: false
      },
      title: {
        text: null
      },
      tickPositions: [0]
    },
    legend: {
      enabled: false
    },
    tooltip: {
      backgroundColor: 'white',
      borderWidth: 1,
      hideDelay: 0,
      shared: true,
      padding: 8,
      borderColor: 'silver',
      borderRadius: 3,
      zIndex:100,
      positioner: function (w, h, point) {
        // console.log('w', w, 'h', h, 'point', point)
        return { x: point.plotX - w / 2, y: point.plotY - h };
      }
    },
    plotOptions: {
      series: {
        animation: false,
        lineWidth: 1,
        shadow: false,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        marker: {
          radius: 1,
          states: {
            hover: {
              radius: 2
            }
          }
        },
        fillOpacity: 0.25
      },
      column: {
        negativeColor: '#910000',
        borderColor: 'silver',
        dataLabels: {
          enabled: true,
          // rotation: 0,
          // color: '#FFFFFF',
          format: '{point.y:.0f}', // one decimal
          // y: 10, // 10 pixels down from the top
          style: {
              fontSize: '8px',
              fontFamily: 'Verdana, sans-serif'
          }
        }
      }
    },

    series: [{
      data: inData ? inData : [1,2,3],
      zones: colorZones,
      
    }]
  }
}

export default function SparkLine(props){
  // console.log('making sparkline', props )
  if(props.data){
    return <Box pt={0}>
        <HighchartsReact
          highcharts={Highcharts}
          options={makeOptions(props.data, props.colorType)}
        />
      </Box>
  }
  else{
    return <></>
  }
 
}