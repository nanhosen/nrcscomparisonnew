import React, { useState, useEffect, useReducer, useContext } from 'react'
import { TableContext } from '../contexts/TableContext'
import Paper from '@mui/material/Paper';
import { Grid, Box} from '@mui/material';
import {areaLabelObj} from '../data/config.js'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const options= {
  chartOptions: {
    chart:{
      type: 'column'
    },
    xAxis: {
      categories: ['A', 'B', 'C'],
    },
    series: [
      { data: [1, 2, 3] }
    ],
  },

}

export default function BasinStatsDisplay(props){
  const context = useContext(TableContext)
  const basins = Object.keys(areaLabelObj)
  const selectedBasin = basins[0]
  const [chartOptions, setChartOptions] = useState(options.chartOptions)
  useEffect(()=>{
    if(context.tableData && context.tableData.length > 0 && basins){
      const nextData = processBasinData(basins, context.tableData, chartOptions)
      console.log('nextData', nextData)
      setChartOptions(nextData)
    }
  },[context.tableData])
  useEffect(()=>{
    console.log('chartOptions', chartOptions)
  },[chartOptions])
  return(
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} >
        <Grid item xs={6} sm={6} md={3} sx={{minWidth:'519px'}}>
          <Paper elevation={0}>
            {selectedBasin}, {areaLabelObj[selectedBasin]}
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
              />
          </Paper>
        </Grid>
      </Grid>
    </Box>    
  )
}

function processBasinData(basinAr, data, chartOptions){
  const basinObj = Object.create({})
  basinAr.map(curr=>basinObj[curr]={nrcsData:[], rfcData:[], stations:[], diffs:[]})
  // console.log('data', data)
  data.map(currStnData=>{
    if(currStnData.basin){
      const {basin} = currStnData
      if(basinObj[basin]){  
        const {nrcsData, rfcData, diff, id} = currStnData
        if(id && diff && nrcsData && rfcData){
          basinObj[basin].nrcsData.push(nrcsData)
          basinObj[basin].rfcData.push(rfcData)
          basinObj[basin].stations.push(id)
          basinObj[basin].diffs.push(diff)
        }
        // pushIfExists(nrcsData, basinObj[basin].nrcsData)
      }
      else{
        console.log('this basin is not in the full basin object', basin)
      }

      // console.log(currStnData.basin, currStnData, basinObj[currStnData.basin])
    }
  })
  console.log('basinObj', basinObj)
  const nextXAxis = {
    categories: basinObj['GN']['stations']
  }
  const nextSeries =  [
      { data: basinObj['GN']['diffs'] }
    ]
  
  const nextOptions = {...chartOptions, xAxis:nextXAxis, series: nextSeries }
  console.log('nextOptions', nextOptions)
  return nextOptions
}

function pushIfExists(data, array){
  if(data){
    array.push(data)
  }
}