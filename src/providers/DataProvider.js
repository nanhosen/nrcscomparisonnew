import React, { useState, useEffect, useReducer } from 'react'
import { TableContext } from '../contexts/TableContext'
import formatTableData  from '../actions/formatTableData'
import axios from 'axios'
import useAxios from 'axios-hooks'

function reducer(state, action){
  switch(action.type){
    case 'processData' : 
      return formatTableData(action.payload)
  }
}

function buttonActionReducer(state, action){
  switch(action.type){
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
  viewMonth: 3,
  viewArea: 'CBRFC',
  viewYear: "2022",
  dataSource: 'both',
  viewField: 'cmp'
}
export default function DataProvider({children}){
  // const [viewMonth, setViewMonth] = useState(1)
  // const [viewArea, setViewArea] = useState('CBRFC')
  // const [viewYear, setViewYear] = useState("2022")
  // const [dataSource, setDataSource] = useState('both')
  const [dataFilters, filterDispatch] = useReducer(buttonActionReducer, initialState)
  // const [basinFilters, setBasinFilters] = useState([])
  const [tableType, setTableType] = useState('data')
  const [normalType, setNormalType] = useState('average')
  const [switchStatus, setSwitchStatus] = useState('false')
  // const [viewField, setViewField] = useState('cmp')
  const [serverData, setServerData] = useState()
  const [reducerData, dispatch] = useReducer(reducer, {})
  const [requestObj, setrequestObj] = useState(encodeURIComponent(JSON.stringify({"year":dataFilters.viewYear, "month":dataFilters.viewMonth, "day":1})))
  const [doneProcessing, setDoneProcessing] = useState(false)
  // const [{ data:requestData, loading, error }, refetch] = useAxios(`https://cbrfc.noaa.gov/dbdata/ndb/nrcsData/cmp/%7B%22year%22%3A%222022%22%2C%22month%22%3A1%2C%22day%22%3A1%7D`)
  const [{ data:requestData, loading, error }, refetch] = useAxios(`https://cbrfc.noaa.gov/dbdata/ndb/nrcsData/${dataFilters.viewField}/${requestObj}`)

  useEffect(()=>{
    console.log('data', requestData, 'loading', loading, 'error', error)
    setServerData(requestData)
  },[requestData, loading, error, requestObj])



  useEffect(()=>{
    if(serverData){
      console.log('i am the server data that is being found', serverData)
      console.log( 'i am the object being sent', {serverData, ...dataFilters})
      console.log('i am the payload', serverData, dataFilters.dataSource, dataFilters.basinFilters, dataFilters.viewMonth, dataFilters)
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

