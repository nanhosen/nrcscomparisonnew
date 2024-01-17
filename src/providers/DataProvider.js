import React, { useState, useEffect, useReducer } from 'react'
import { TableContext } from '../contexts/TableContext'
import formatTableData  from '../actions/formatTableData'
import axios from 'axios'
import useAxios from 'axios-hooks'
import { SwitchAccessShortcutAddTwoTone } from '@mui/icons-material'

function reducer(state, action){
  // console.log('in reducer reducer', 'state', state, 'action', action)
  switch(action.type){
    case 'processData' : 
      return formatTableData(action.payload)
  }
} 

function buttonActionReducer(state, action){
  switch(action.type){
    case 'initLoad':
      return{...state, ...action.payload}
    case 'viewField':
        return {...state, viewField: action.payload};   
    case 'viewMonth':
      return {...state, viewMonth: action.payload};
    case 'viewYear':
      return {...state, viewYear: action.payload};
    case 'basinFilters':
      return {...state, basinFilters: action.payload};   
    case 'dataSource':
        return {...state, dataSource: action.payload}
  }
}
const initialState = {
  basinFilters: [],
  viewMonth: 1,
  viewArea: 'CBRFC',
  viewYear: "2023",
  dataSource: 'both',
  viewField: 'cmp'
}


function newserverdatareducer(state = {}, action) {
  console.log('this action', action)
  switch (action.type) {
    case 'FETCH_DATA_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        [action.payload.viewField]: action.payload.data,
      };
    case 'FETCH_DATA_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}




async function* generatorFunction(newestYear,oldestYear) {
  for(let value = newestYear; value >= oldestYear; value--) {
      let url = `https://www.cbrfc.noaa.gov/dbdata/ndb/dataMonths/${value}`
      // console.log('month url', url)
      const monthArray = await axios.get(url)
      // console.log('month array', monthArray)
      yield {monthArray: monthArray.data , year: value};
    }
}

async function makeInitialState(){
  const currYear = new Date().getFullYear()
  // console.log('curr year', currYear)
  const oldestYear = 2020
  const generator = generatorFunction(currYear, oldestYear)
  let monthArray
  let dataYear
  for await (const value of generator) {
    if(value?.monthArray?.data){
      monthArray = value.monthArray.data
      dataYear = value.year
      generator.return(value?.monthArray?.data)
    }
  }
  const latestMonth = monthArray && monthArray.length > 0 ? Math.max(...monthArray) : 1
  // console.log('monthArray',latestMonth)

  return {
    basinFilters: [],
    viewMonth: latestMonth ,
    viewArea: 'CBRFC',
    viewYear: dataYear ? dataYear : currYear,
    dataSource: 'both',
    viewField: 'cmp'
  }

}

makeInitialState()
// need to think through how to initialize this. Think could be some sort of action/reducer type thing. 
//basically the workflow that has to happens is wait requests for initial state. Then onece have that request data
//then once have server data process it for the table. Need to be able to update to request when buttons pressed. 
//okay, use-axios thing has a manual trigger, so I can force it to execute when  the initital state is there. but do I want to 
// do a complicated useeffect thing or have a reducer that runs differently...no I think use effect will be good because
//it will be doing the same thing whether its the first request or not
export default function DataProvider({children}){
  const [dataFilters, filterDispatch] = useReducer(buttonActionReducer, {})
  const [tableType, setTableType] = useState('data')
  const [normalType, setNormalType] = useState('average')
  const [switchStatus, setSwitchStatus] = useState('false')
  const [serverData, setServerData] = useState()
  const [reducerServerData, reducerServerDataDispatch] = useReducer(newserverdatareducer, {})
  // const [yearMonths, setYearMonths] = useState()
  const [reducerData, dispatch] = useReducer(reducer, {})
  const [requestObj, setrequestObj] = useState(encodeURIComponent(JSON.stringify({"year":dataFilters.viewYear ? dataFilters.viewYear : 2023, "month":dataFilters.viewMonth, "day":1})))
  const [doneProcessing, setDoneProcessing] = useState(false)
  const [{ data:requestData, loading, error }, refetch] = useAxios(`https://www.cbrfc.noaa.gov/dbdata/ndb/nrcsData/${'cmp'}/${requestObj}`)
  // const [{ data:requestData, loading, error }, refetch] = useAxios(`https://cbrfc.noaa.gov/dbdata/ndb/nrcsData/${dataFilters.viewField}/${requestObj}`)

  const fetchData = async (viewField, requestObj) => {
    console.log('in fetch data', viewField, requestObj)
    reducerServerDataDispatch({ type: 'FETCH_DATA_START' });
    try {
      const response = await axios.get(`https://www.cbrfc.noaa.gov/dbdata/ndb/nrcsData/${viewField}/${requestObj}`); // Example endpoint
      console.log('response', response)
      reducerServerDataDispatch({ type: 'FETCH_DATA_SUCCESS', payload: { viewField, data: response.data } });
    } catch (error) {
      console.log('here is an error', error)
      reducerServerDataDispatch({ type: 'FETCH_DATA_FAILURE', payload: error });
    }
  };
  
  useEffect(()=>{
    console.log('changed this reducerServerData', reducerServerData)
  },[reducerServerData])
  useEffect(()=>{
    console.log('data', requestData, 'loading', loading, 'error', error)
    // console.log(requestData.data.SRYU1)
    if(requestData?.data && requestData?.data?.SRYU1){
      console.log(requestData.data.SRYU1)
      delete requestData.data.SRYU1
    }
    if(requestData?.data && requestData?.data?.VCVU1){
      console.log(requestData.data.VCVU1)
      delete requestData.data.VCVU1
    }
    setServerData(requestData)
  },[requestData, loading, error, requestObj])

  useEffect(()=>{
    async function makeInit(){
      const initState = await makeInitialState()
      filterDispatch({type: 'initLoad', payload:{...initState}})

      // console.log('initialState', initState)
    }
    makeInit()
  },[])

  useEffect(()=>{
    console.log('this is the view field i think it changed', dataFilters.viewField)
    if( dataFilters.viewField && requestObj){
      console.log('ojc keys', Object.keys(requestObj))
      if(!reducerServerData[dataFilters.viewField]){
        // console.log
        console.log('goingn to fetch data')
        fetchData( dataFilters.viewField,requestObj)  
      }
      console.log('this is the state', reducerServerData)
      console.log('fetching data for this type',  dataFilters.viewField)
      console.log('this is the request ob', requestObj)
      // fetchData( dataFilters.viewField)
    }
    else{
      console.log('i am missing one of ', dataFilters.viewField, requestObj)
    }
  },[dataFilters, requestObj])

  useEffect(()=>{
    if(serverData){
      console.log('server data', serverData)
      console.log('data filtersxxxxxx', dataFilters)
      dispatch({type:'processData', payload: {serverData, ...dataFilters}})
    }
  },[serverData, dataFilters.dataSource, dataFilters.basinFilters, dataFilters.viewMonth, dataFilters])
// },[serverData, dataSource, basinFilters, viewMonth])

  useEffect(()=>{
    if(dataFilters.viewYear && dataFilters.viewMonth){
      const encodedObj = encodeURIComponent(JSON.stringify({"year":dataFilters.viewYear, "month":dataFilters.viewMonth, "day":1}))
      setrequestObj(encodedObj)
    }
  },[dataFilters.viewYear, dataFilters.viewMonth])

  useEffect(()=>{

    if(dataFilters.dataSource === 'nrcs'){
      // setBasinFilters([])
      // console.log('next state', {...dataFilters, basinFilters:[]})
      filterDispatch({type: 'basinFilters', payload:[]})
    }
 
  },[dataFilters])

  

  
  return (
    <TableContext.Provider value={{loading, error, tableData: reducerData, dataFilters, filterDispatch, tableType, setTableType, normalType, setNormalType, switchStatus, setSwitchStatus, doneProcessing, setDoneProcessing}}>
          {children}
    </TableContext.Provider>
  );
}

