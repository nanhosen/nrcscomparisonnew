import React, {useEffect, useState, useContext, useReducer, useMemo} from 'react';
import TableContext from '../contexts/TableContext'
import { initialObj } from '../styles/tableColors';
// import TableHeader from './TableHeader';
import TableStatsSwitch from './TableStatsSwitch';
import TableTypeSwitch from './TableTypeSwitch';

import { 
  DataGrid, 
  GridToolbar,  
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport ,
  useGridApiRef
} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Grid, Box, Typography, Switch } from '@mui/material';
import clsx from 'clsx';
// import HelpOutlineIcon from '@mui/icons-material/Delete';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const diffDescriber = 'Explanation of why these stations cannot be compared'
// console.log(initialObj)

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
  const {normalType, dispatcher,  ...rest} = props
  return (
    <GridToolbarContainer >
      <Box pt={0.18}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </Box>
      <TableStatsSwitch dispatcher = {dispatcher}/>
      {/* <TableTypeSwitch /> */}
    </GridToolbarContainer>
  );
}

function columnVisibilityReducer(state, action){
  console.log('column visibility reducer payload', action, action.payload)
  console.log('column visibility reducer state', state)
  switch(action.type){
    case 'statType':
      const newState = {
        rfcMed30: action.payload,
        rfcpmed30: action.payload,
      
        nrcsMed30: action.payload,
        nrcspmed30: action.payload,
      
        rfcAvg30: !action.payload,
        rfcpavg30: !action.payload,
      
        nrcsAvg30: !action.payload,
        nrcspavg30: !action.payload,
      }
      return {...state, ...newState}
      // return action.payload
    case 'standardChange':
      return action.payload
    default:
      return state
  }
}

// const initialColumnModel = {
//   rfcMed30: false,
//   rfcpmed30: false,

//   nrcsMed30: false,
//   nrcspmed30: false,

//   rfcAvg30: true,
//   rfcpavg30: true,

//   nrcsAvg30: true,
//   nrcspavg30: true,
// }

const initialColumnModel = {
  basin: true,
  diff: true,
  diffPct: true,
  nrcsAvg30: true,
  nrcsData: true,
  nrcsMed30: false,
  nrcsStn: true,
  nrcspavg30: true,
  nrcspmed30: false,
  period: true,
  rfcAvg30: true,
  rfcData: true,
  rfcMed30: false,
  rfcpavg30: true,
  rfcpmed30: false,
  riverLocation: true,
  riverName: true,
  state: true,
  stnId: true
}
export default function DataDisplayTable() {
  const context = useContext(TableContext)
  const apiRef = useGridApiRef()
  const initialSwitchValue = false
  const [displayDataDeprecated, setDisplayData]=useState()
  const [statType, setStatType]=useState(context.normalType)
  const [lastStation, setLastStation] = useState()
  const [switchState, setSwitchState]= useState(initialSwitchValue)
  const [columnVisibilityModel, setColumnVisibilityDispatcher] = useReducer(columnVisibilityReducer, initialColumnModel)
  const [filterModel, setFilterModel] = useState({
    items: [
      // {
      //   columnField: 'state',
      //   operatorValue: 'equals',
      //   value: 'UT',
      // },
    ],
  })
       
  // useEffect(()=>{
  //   // console.log('context', context.tableData)
  //   if(context.tableData){
  //     console.log('table data is here')

  //     setDisplayData(context.tableData)
  //   }
  // },[context.tableData])

  const memoDisplayData = useMemo(()=>{
    if(context.tableData){
      console.log('table data is here', context.tableData)
      if(context.tableType === 'chart'){
        const stns = ["AFPU1","ASHU1","BCTU1","BERU1","BEVU1","BFFU1","BNRU1","BRUU1","CASU1","CCDU1","CCSU1","CIVU1","CLLU1","CLRU1","COAU1","CRAU1","CRUU1","DADU1","DCRU1","DELU1","DOLU1","DURU1","ECBU1","ECRU1","ELLU1","MIU1","FCNU1","FRRU1","GATU1","GRNU1","GRVU1","HATU1","HPBU1","HRMU1","HURU1","JOVU1","LAAU1","LAMU1","LCTU1","LGNU1","MAAU1","CMU1","MDCU1","MILU1","MYRU1","NEUU1","OAWU1","OGHU1","PINU1","PIUU1","PRLU1","PRZU1","PVHU1","RBCU1","RKUU1","ROKU1","SAYU1","CMU1","SEKU1","SFRU1","SFSU1","SRKU1","SRYU1","STAU1","STCU1","STIU1","SZZU1","TADU1","USTU1","10166605","VCVU1","VIRU1","WATU1","WCGU1","WESU1","WFDU1","WOOU1","WRSU1","WTRU1","YLLU1","9219750","9291000","9329050","9337000","0023000","0133800","0146000","0172952","0173450"]
        const sparklineTableData = context.tableData.filter(curr=>{
          // console.log('curr', curr, curr.id)
          return stns.indexOf(curr.id)>=0
        })
        
        console.log(sparklineTableData.length, sparklineTableData[sparklineTableData.length -1])


        return sparklineTableData
      }
      else if(context.tableType ==='data'){
        return context.tableData
      }
      else{
        throw new Error('invalid table type', context.tableType)
      } //data

    }
  },[context.tableData, context.tableType])

  
  // useEffect(()=>{
  //   setStatType(context.normalType)
  // },[context.normalType])

  // useEffect(() => {
  //   if(apiRef && apiRef.current){
  //     return apiRef.current.subscribeEvent(
  //       GridEvents.cellClick,
  //       onEvent,
  //     );
  //   }
  // }, [apiRef]);

  
  const handleSwitch =(event)=>{
    console.log('handle switch event from parent component this is the event value', event)
    setSwitchState(event)
    setColumnVisibilityDispatcher({type:'switchChange', payload: event})
  }

  // useEffect(()=>{
  //   // console.log('column moedel', columnVisibilityModel)
  // },[columnVisibilityModel])

  


  if(memoDisplayData){
    // console.log('rendering table')
    // console.log('display data', memoDisplayData)
    // console.log('context',context)
    
    return (
      <Box sx={initialObj}>
          <Grid item xs={12} lg={12} sx={{ width: '100%', height:'3500px' }}>
          <Paper elevation={0} sx={{ width: '100%', height:'3500px' }}>
            <DataGrid 
              columns={makeColumns()}
              rows= {memoDisplayData} 
              filterModel={filterModel}
              onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
              columnVisibilityModel={columnVisibilityModel}
              onColumnVisibilityModelChange={(newModel) =>{
                console.log('new model column thing', newModel)
                console.log('new model column thing switchState', switchState)
                setColumnVisibilityDispatcher({type:'standardChange', payload: newModel})
              }}
              components={{ Toolbar: CustomToolbar }}
              componentsProps={{
                toolbar: { normalType: context.normalType, dispatcher: setColumnVisibilityDispatcher },
              }} 
              // componentsProps={{ toolbar:'average' }}
              density = {'compact'}
              autoHeight = {true}
              rowHeight={35}
              headerHeight = {80}
              sx={{
                '& .MuiDataGrid-columnHeaderTitle': {
                    textOverflow: "clip",
                    whiteSpace: "break-spaces",
                    lineHeight: 1
                },
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
  // console.log('field', params, 'value', params.field)
  // console.log('params', params, 'value', params.getValue(params.id,'id'))
  const useValue  = params.field === 'diff' ? params.row.diffPct : params.value 

  if(!params){
    return {}
  }
  else{
    return {
      na:params.value === 'na',
      neg100: params.value < -80,
      neg80: params.value >= -80 && params.value < -60,
      neg60: params.value >= -60 && params.value < -40,
      neg40: params.value >= -40 && params.value < -20,
      neg20: params.value >= -20 && params.value < -1,
      abs0: params.value >= -1 && params.value <=1,
      pos20: params.value >1 && params.value < 20,
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
  // console.log('making columns params:', params)
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
      minWidth:50,
      flex: 0.8

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
      headerName:'Difference (NRCS-CBRFC)',
      flex: 0.3,
      // maxWidth: 75,
      // cellClassName: (params) => { 
      //   // console.log('params', params)
      //   return clsx('super-app', 
      //     returnColorObject(params)
      //   )},
      renderCell:(params) =>{
        if(params.value !== 'na'){
          return params.value
        }
        else{
          return <><Tooltip title={diffDescriber} placement="bottom" arrow>
          <IconButton>
            <HelpCenterIcon fontSize="small"/>
          </IconButton>
        </Tooltip>
            N/A
        </>
        }
      }  
    },
    {
      field:'diffPct',
      headerName:'Difference % (NRCS-CBRFC)',
      flex: 0.3,
      renderCell: params=>{
        return params.value!== 'na' ? params.value : ''
      },
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