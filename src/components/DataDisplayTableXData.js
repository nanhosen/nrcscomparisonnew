import React, {useEffect, useState, useContext} from 'react';
import TableContext from '../contexts/TableContext'
import { initialObj } from '../styles/tableColors';
// import TableHeader from './TableHeader';
import { 
  DataGrid, 
  GridToolbar,  
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport 
} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Grid, Box, Typography } from '@mui/material';
import clsx from 'clsx';

// import { useDemoData } from '@mui/x-data-grid-generator';
// compareFunction(a, b) return value	sort order
// > 0	sort b before a
// < 0	sort a before b
// === 0	keep original order of a and b
// So, the compare function has the following form:

// function compare(a, b) {
//   if (a is less than b by some ordering criterion) {
//     return -1;
//   }
//   if (a is greater than b by the ordering criterion) {
//     return 1;
//   }
//   // a must be equal to b
//   return 0;
// }
const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];
function basinComparator(a, b){
  //1 means flip the order
  //-1 means a goes before b
  const numericA = a.length > 6 ? +a.slice(0,-1) : +a
  const numericB = b.length > 6 ? +b.slice(0,-1) : +b
  const isNumericA = isNaN(numericA)
  const isNumericB = isNaN(numericB)
  //if a is Nan and b is number, sort a before b (-1)
  //if a is number and b is NaN, sort b before a (1)
  // if both number or both NaN then do regular sorting
  let sortResult
  if(isNumericA && !isNumericB){
    sortResult = -1
  }
  else if(!isNumericA && isNumericB){
    sortResult = 1
  }
  else{
    sortResult = a>b? 1 : -1
  }
  return sortResult 
}
function CustomToolbar(props) {
  return (
    <GridToolbarContainer {...props}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
export default function DataDisplayTable() {
  const context = useContext(TableContext)
  const [displayData, setDisplayData]=useState()
  useEffect(()=>{
    // console.log('context', context.tableData)
    if(context.tableData){
      console.log('table data is here')

      setDisplayData(context.tableData)
    }
  },[context.tableData])
  // const columns = [
  //   { field: 'firstName', headerName: 'First name', width: 130 },
  //   { field: 'lastName', headerName: 'Last name', width: 130 },
  //   {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     width: 160,
  //     valueGetter: getFullName,
  //   },
  // ];
  
  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon' },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei' },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime' },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya' },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys' },
  // ];
  
  
  const columns = [
    {
      field:'basin',
      headerName:'Area',
      // valueGetter: (params)=>params.row.basin,
      // sortComparator: basinComparator
    },
    {
      field:'subbasin',
      headerName:'Sub Area',
    },
    {
      field:'stnId',
      headerName:'NWS ID',
      valueGetter: (params)=>params.row.stnId,
      sortComparator: basinComparator

    },
    {
      field:'riverName',
      headerName:'River',
      minWidth:200
    },
    {
      field:'riverLocation',
      headerName:'Location',
      minWidth:300,
    },
    {
      field:'fDate',
      headerName:'Forecast Date',
    },
    {
      field:'period',
      headerName:'Forecast Period',
    },
    {
      field:'rfcData',
      headerName:'CBRFC Forecast',
    },
    {
      field:'nrcsData',
      headerName:'NRCS Forecast',
    },
    {
      field:'diff',
      headerName:'Difference',
      cellClassName: (params) => { 
        // console.log('params', params)
        return clsx('super-app', {
          neg100: params.value < -80,
          neg80: params.value >= -80 && params.value < -60,
          neg60: params.value >= -60 && params.value < -40,
          neg40: params.value >= -40 && params.value < -20,
          neg20: params.value >= -20 && params.value < 0,
          abs0: params.value === 0,
          pos20: params.value >0 && params.value < 20,
          pos40: params.value >=20 && params.value < 40,
          pos60: params.value >=40 && params.value < 60,
          pos80: params.value >=60 && params.value < 80,
          pos100: params.value >=80,
      })}
    },
    {
      field:'diffPct',
      headerName:'Diff %',
      cellClassName: (params) => { 
        const absVal = Math.abs(params.value)
        const isPos = absVal>20
        const isNeg = absVal <=20

        return clsx('super-app', {
          neg100: params.value < -80,
          neg80: params.value >= -80 && params.value < -60,
          neg60: params.value >= -60 && params.value < -40,
          neg40: params.value >= -40 && params.value < -20,
          neg20: params.value >= -20 && params.value < 0,
          abs0: params.value === 0,
          pos20: params.value >0 && params.value < 20,
          pos40: params.value >=20 && params.value < 40,
          pos60: params.value >=40 && params.value < 60,
          pos80: params.value >=60 && params.value < 80,
          pos100: params.value >=80,
      })},
    },
  ]

  if(displayData){
    const testData = [{basin: 'test', subbasin: 'test', stnId: 'test', id:1, riverName: 'test'}]
    return (
      <Box sx={initialObj}>
          <Grid item xs={12} lg={12} sx={{ width: '100%', height:'3500px' }}>
          <Paper elevation={0} sx={{ width: '100%', height:'3500px' }}>
            <DataGrid 
              columns={columns}
              rows= {displayData} 
              components={{ Toolbar: CustomToolbar }} 
              density = {'compact'}
              autoHeight = {true}
              rowHeight={35}
              headerHeight = {80}
              sx={{
                    '& .MuiDataGrid-columnHeaderTitle': {
                        textOverflow: "clip",
                        whiteSpace: "break-spaces",
                        lineHeight: 1
                    }
                }}
                initialState={{
                  sorting: {
                    sortModel: [
                      {
                        field: 'stnId',
                        sort: 'asc',
                      },
                    ],
                  },
                }}  
            />
      </Paper>
          </Grid>
      </Box>
    );
  }
  else{
    return(
      <>
      <Box sx={{ width: '100%' }}>
          <Grid item xs={12} lg={12}>
            <Paper elevation={0}>
                Loading...
            </Paper>
          </Grid>
      </Box>
      </>
    )

  }
}


function periodToNum(period){
  const monthNumObj={
    JAN:1,
    FEB:2,
    MAR:3,
    APR:4,
    MAY:5,
    JUN:6,
    JUL:7,
    AUG:8,
    SEP:9,
    OCT:10,
    NOV:11,
    DEC:12
  }
  const periodAr = period.split('-')
  const monNum1 = isNaN(parseFloat(periodAr[0])) ? monthNumObj[periodAr[0]] : periodAr[0] 
  const monNum2 = isNaN(parseFloat(periodAr[1])) ? monthNumObj[periodAr[1]] : periodAr[1]
  return monNum1 && monNum2 ? `${monNum1}-${monNum2}` : false


  // if(isNaN(monNum1) && isNaN(monNum2)){
  //   console.log(monthNumObj[periodAr[0]], monNum1, 'ugh')
  //   console.log('in period function')
  //   console.log('periodAr', parseFloat(periodAr[0]), periodAr[0],'fn period', period)
  // }
}
// if(rest){
//   if(rest.period){
//     const periodString =  periodToNum(rest.period)
//     if(periodString){
//       rest.period = periodString
//     }
//     //look like {basin: 'value', }
//     // console.log('period', period, 'parsed', periodToNum(period))
//   }
  
//   id = id + 1
//   const flatStnData = {...metadata, ...rest, stationId: stnId, id, nrcsData: rest.nrcsData 
//     ? rest.nrcsData
//      : rest.stnNrcsData
//        ? rest.stnNrcsData  
//         : undefined}
//   // console.log('flatStnData', flatStnData)
//   fullDataAr.push(flatStnData)
// }
// function formatToFit(data, stnId){
//   const {basin, diff, diffPct, rfcData, riverLocation, riverName, subbasin, nrcsData, idVal, ...rest} = data
//   const returnObj = {stnId, basin, diff, diffPct, rfcData, fDate: '1-1-2022', riverLocation, riverName, subbasin, nrcsData, id: idVal}
//   console.log('rest', rest)
//   if(rest){
//     if(rest.period && periodToNum(rest.period)){
//       rest.period = periodToNum(rest.period)
//     }
//     if(rest.stationId && !returnObj.stnId){
//       returnObj.stnId = rest.stationId
//     }
//     if(rest.stationId && !returnObj.stnId){
//       returnObj.stnId = rest.stationId
//     }
//     if(rest.stnNrcsData && !returnObj.nrcsData){
//       returnObj.nrcsData = rest.stnNrcsData
//     }
//   }
//   return returnObj
//   }


//   field: "cmp"
// id: 83
// nrcsData: 1130
// period: "4-9"
// nrcsStn: "09365500"






//   field: "cmp"
// id: 83
// nrcsData: 1130
// period: "4-9"
// stationId: "12452500"
// stnNrcsData: 1130

// // basin: "SJ"
// // diff: 1
// // diffPct: 104.76190476190477
// field: "cmp"
// id: 401
// nrcsData: 22
// nrcsStn: "09365500"
// period: "4-7"
// // rfcData: 21
// // riverLocation: " HESPERUS "
// // riverName: "LA PLATA "
// state: "CO"
// stationId: "LPHC2"
// // subbasin: "SJ"




// cellClassName: (params) => { 
//   // console.log('params', params)
//   return clsx('super-app', {
//     positive: params.value < 0,
//   negative: params.value > 0,
// })}