import React, {useEffect, useState, useContext, useReducer} from 'react';
import TableContext from '../contexts/TableContext'
import { initialObj } from '../styles/tableColors';
// import TableHeader from './TableHeader';
import TableStatsSwitch from './TableStatsSwitch';
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
import { Grid, Box, Typography, Switch } from '@mui/material';
import clsx from 'clsx';
console.log(initialObj)

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
  // console.log('toolbar props', props)
  return (
    <GridToolbarContainer {...props}>
    <Box pt={0.18}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </Box>
      <TableStatsSwitch switchhandler={props.switchhandler}/>
    </GridToolbarContainer>
  );
}

function columnVisibilityReducer(state, action){
  switch(action.type){
    case 'switchChange':
      return {
        rfcMed30: action.payload,
        rfcpmed30: action.payload,
      
        nrcsMed30: action.payload,
        nrcspmed30: action.payload,
      
        rfcAvg30: !action.payload,
        rfcpavg30: !action.payload,
      
        nrcsAvg30: !action.payload,
        nrcspavg30: !action.payload,
      }
      // return action.payload
    default:
      return state
  }
}

const initialColumnModel = {
  rfcMed30: false,
  rfcpmed30: false,

  nrcsMed30: false,
  nrcspmed30: false,

  rfcAvg30: true,
  rfcpavg30: true,

  nrcsAvg30: true,
  nrcspavg30: true,
}
export default function DataDisplayTable() {
  const context = useContext(TableContext)
  const initialSwitchValue = false
  const [displayData, setDisplayData]=useState()
  const [statType, setStatType]=useState('average')
  const [switchState, setSwitchState]= useState(initialSwitchValue)
  const [columnVisibilityModel, setColumnVisibilityDispatcher] = useReducer(columnVisibilityReducer, initialColumnModel)
  const [filterModel, setFilterModel] = useState({
    items: [
      {
        columnField: 'state',
        operatorValue: 'equals',
        value: 'UT',
      },
    ],
  })
       
  useEffect(()=>{
    // console.log('context', context.tableData)
    if(context.tableData){
      console.log('table data is here')

      setDisplayData(context.tableData)
    }
  },[context.tableData])

  
  const handleSwitch =(event)=>{
    // console.log('handle switch event from parent component this is the event value', event)
    setSwitchState(event)
    setColumnVisibilityDispatcher({type:'switchChange', payload: event})
  }

  // useEffect(()=>{
  //   // console.log('column moedel', columnVisibilityModel)
  // },[columnVisibilityModel])


  if(displayData){
    
    
    return (
      <Box sx={initialObj}>
          <Grid item xs={12} lg={12} sx={{ width: '100%', height:'3500px' }}>
          <Paper elevation={0} sx={{ width: '100%', height:'3500px' }}>
            <DataGrid 
              columns={makeColumns()}
              rows= {displayData} 
              filterModel={filterModel}
              onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
              columnVisibilityModel={columnVisibilityModel}
              onColumnVisibilityModelChange={(newModel) =>
                setColumnVisibilityDispatcher({type:'mysteriousChange', payload: switchState})
              }
              components={{ Toolbar: CustomToolbar }} 
              componentsProps={{ toolbar: { switchhandler: handleSwitch } }}
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

function returnColorObject(params){
  if(!params){
    return {}
  }
  else{
    return {
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
  }
  }
}

function returnColorObjectPercent(params){
  if(!params){
    return {}
  }
  else{
    return {
      blw50: params.value < 50,
      pos70: params.value >=50 && params.value < 70,
      pos90: params.value >=70 && params.value < 90,
      pos110: params.value >=90 && params.value < 110,
      pos130: params.value >=110 && params.value < 130,
      pos150: params.value >=130 && params.value < 150,
      abv150: params.value >=150,
    }
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
}

function makeColumns(params){
  const columns = [
    {
      field:'state',
      headerName:'State',
      flex: 0.3,
      // valueGetter: (params)=>params.row.basin,
      // sortComparator: basinComparator,
      maxWidth:50
    },
    {
      field:'basin',
      headerName:'Area',
      flex: 0.3,
      // valueGetter: (params)=>params.row.basin,
      // sortComparator: basinComparator,
      maxWidth:50
    },

    {
      field:'stnId',
      headerName:'Station ID',
      valueGetter: (params)=>params.row.stnId,
      sortComparator: basinComparator,
      flex: 0.3,
      maxWidth:80
    },
    {
      field:'nrcsStn',
      headerName:' USGS Station ID',
      flex: 0.9,
      maxWidth:100
    },
    {
      field:'riverName',
      headerName:'River',
      minWidth:150,
      flex: 1

    },
    {
      field:'riverLocation',
      headerName:'Location',
      minWidth:250,
      flex: 1

    },
    {
      field:'period',
      headerName:'Fcst Period',
      flex: 0.3,
      // maxWidth: 50
    },
    {
      field:'rfcData',
      headerName:'CBRFC Fcst (KAF)',
      flex: 0.3,
      // maxWidth: 70
    },
    {
      field:'rfcAvg30',
      headerName:'CBRFC Avg (KAF)',
      flex: 0.3,
      // maxWidth: 70
    },
    {
      field:'rfcpavg30',
      headerName:'RFC % of Avg',
      flex: 0.3,
      // maxWidth: 65,
      cellClassName: (params) => { 
        return clsx('super-app', 
        returnColorObjectPercent(params)
        )}
      },
      {
        field:'rfcMed30',
        headerName:'CBRFC Med (KAF)',
      flex: 0.3,
        // maxWidth: 70
      },
    {
      field:'rfcpmed30',
      headerName:'RFC % of Med',
      flex: 0.3,
      // maxWidth: 65,
      cellClassName: (params) => { 
        // console.log('params', params)
        return clsx('super-app', 
          returnColorObjectPercent(params)
        )}
    },
    {
      field:'nrcsData',
      headerName:'NRCS Fcst (KAF)',
      flex: 0.3,
      // maxWidth: 60
    },
    {
      field:'nrcsMed30',
      headerName:'NRCS Med (KAF)',
      flex: 0.3,
      // maxWidth: 70
    },
    {
      field:'nrcspmed30',
      headerName:'NRCS % of Med',
      flex: 0.3,
      // maxWidth: 65,
      cellClassName: (params) => { 
        // console.log('params', params)
        return clsx('super-app', 
          returnColorObjectPercent(params)
        )}
    },
    {
      field:'nrcsAvg30',
      headerName:'NRCS Avg (KAF)',
      flex: 0.3,
      // maxWidth: 70
    },
    {
      field:'nrcspavg30',
      headerName:'NRCS % of Avg',
      flex: 0.3,
      // maxWidth: 65,
      cellClassName: (params) => { 
        // console.log('params', params)
        return clsx('super-app', 
          returnColorObjectPercent(params)
        )}
    },
    {
      field:'diff',
      headerName:'Difference (NRCS-RFC)',
      flex: 0.3,
      // maxWidth: 75,
      cellClassName: (params) => { 
        // console.log('params', params)
        return clsx('super-app', 
          returnColorObject(params)
        )}
    },
    {
      field:'diffPct',
      headerName:'Diff %',
      flex: 0.3,
      // maxWidth: 40,
      cellClassName: (params) => { 
        // console.log('params', params)
        return clsx('super-app', 
          returnColorObject(params)
        )},
    },
  ]

  return columns
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