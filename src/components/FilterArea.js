import React, {useEffect, useState, useContext, useReducer} from 'react';
import TableContext from '../contexts/TableContext'
// import DataSourceFilter from './DataSourceFilter';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { Grid, Box,  ToggleButtonGroup, ToggleButton,  Typography,  ListItem, Switch,  } from '@mui/material';
import {dataForConfig, dataDates} from '../data/config.js'
import axios from 'axios'
import { LinearProgress } from '@mui/material';


async function getData(url){
  const axiosData = await axios.get(url) 
  return axiosData
}
export default function FilterArea(props){
  const context = useContext(TableContext)
  // const [selectedButtons, setSelectedButtons] = useState(context.basinFilters)
  // const [formats, setFormats]  = React.useState(() => ['SJ'])
  // const [configData, setConfigData] = useState(dataForConfig)
  // const [buttonConfig, setButtonConfig] = useState(areaData)
  const [dynamicButtonConfig, setDynamicButtonConfig] = useState()
  // const [reducerButtonConfig, dispatch] = useState(reducer, {})
  const [monthWidth, setMonthWidth] = useState(210)
  // const [{ data:requestData, loading, error }, refetch] = useAxios(`https://cbrfc.noaa.gov/dbdata/ndb/nrcsData/${viewField}/${requestObj}`)

  const handleFormat = (newFormats, stateKey, dispatchFn) => {
    // console.log('handleFormat', event, section, newFormats, setterObj)
    // console.log('handkleFormat', 'stateKey', stateKey)
    // console.log('dipatchFn', dispatchFn)
    if(newFormats){
      dispatchFn({type: stateKey, payload: newFormats})
    }
    // console.log("newFOrmats", newFormats,'section', section, 'event', event, 'setterobj', setterObj[section]);
    // if(newFormats && setterObj?.setter){
    //   // console.log('i have new formats and setter and I am setting', setterObj.setter)
    //   // setterObj[section]['setter'](newFormats);
    //   setterObj.setter(newFormats)
    // }
  };
  useEffect(()=>{
    console.log('context', context)
  },[context])

  // useEffect(async()=>{
  //   // console.log('view m onths', dataDates[context.dataFilters.viewYear])
  //   let monthAr
  //   if(new Date().getFullYear() === +context.dataFilters.viewYear){
  //     const theseDates = await getData(`https://cbrfc.noaa.gov/dbdata/ndb/dataMonths/${context.dataFilters.viewYear}`)
  //     if(theseDates?.data?.data){
  //       console.log('theseDates', theseDates.data.data)
  //       monthAr = theseDates.data.data
  //     }
  //   }
  //   else if(dataDates && dataDates[context.dataFilters.viewYear]){
  //     monthAr = dataDates[context.dataFilters.viewYear]['months']
  //   }
  //   if(monthAr && monthAr.length > 0){
  //     const newConfigData = {...dataForConfig}
  //     newConfigData.month.dataAr = monthAr.sort((a,b)=>a-b)
  //     // console.log('newConfigData', newConfigData)
  //     // console.log(dataDates[context.dataFilters.viewYear]['months'], 'monthss')
  //     // setDynamicButtonConfig(newConfigData)
  //     // setMonthWidth(monthAr.length > 3 ? 220 : 210)
  //   }
    
  // },[context.dataFilters.viewYear])
  
  useEffect(()=>{
    async function makeConfig(){

      //this generates the master config object. Based off config info in the /data/config.js file. 
      //Will need to request available months for current year which means that will will depend on the selected year. I think that's the only variable
      //in the future if add areas will also depend on selected area. Although should probably remove area filters if data source is only nrcs
      if(!dataForConfig){
        return
      }
      // const setterObj = {
      //   area: {state: context.basinFilters, setter: context.setBasinFilters},
      //   dataSource: {state: context.dataSource, setter: context.setDataSource},
      //   month: {state: context.viewMonth, setter: context.setViewMonth},
      //   probability: {state: context.viewField, setter: context.setViewField},
      //   year: {state: context.dataFilters.viewYear, setter: context.setViewYear}
      // }
      let monthAr
      if(new Date().getFullYear() === +context.dataFilters.viewYear ||( dataDates && dataDates[context.dataFilters.viewYear] && !dataDates[context.dataFilters.viewYear]['months'])){
        const theseDates = await getData(`https://cbrfc.noaa.gov/dbdata/ndb/dataMonths/${context.dataFilters.viewYear}`)
        if(theseDates?.data?.data){
          // console.log('theseDates', theseDates.data.data)
          monthAr = theseDates.data.data
        }
      }
      else if(dataDates && dataDates[context.dataFilters.viewYear]){
        monthAr = dataDates[context.dataFilters.viewYear]['months']
      }
      if(dataForConfig){
        const newConfigData = {...dataForConfig}
        newConfigData.month.dataAr = monthAr.sort((a,b)=>a-b)
        const calcedConfig = makeButtonConfig(newConfigData)
        // console.log('calcedConfig', calcedConfig)
        setDynamicButtonConfig(calcedConfig)
      }
      else{
        console.log('no config data from the data config file in /data/config.js')
      }
    }
    makeConfig()

  },[context.dataFilters.viewYear, context.dataSource, dataForConfig, context.basinFilters, context.dataSource, context.viewMonth, context.viewField, context.dataFilters.viewYear])

  // useEffect(()=>{
  //   console.log('selectedButtons', selectedButtons)
  // },[selectedButtons])
  // const buttonArray1 = ['CBRFC','Green','Colorado','San Juan','Great','Sevier','Virgin','Lower Colorado']
  // const buttonArray2 = ['Min 90','P 70','Most Prob','P 30','Max 10']
  if(dynamicButtonConfig){
    // const area width should be 519
    // console.log('dynamic', dynamicButtonConfig)
    return(
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} >
          <Grid item xs={6} sm={6} md={3} sx={{minWidth:'519px'}}>
            <Paper elevation={0}>
              <ListInner 
                label={dynamicButtonConfig?.area.title} 
                buttons = {dynamicButtonConfig?.area.buttonData} 
                handleFormat = {handleFormat} 
                value = {context.dataFilters.basinFilters} 
                disabledStatus={context.dataSource === 'nrcs' ? true : false}
                exclusive={false}
                section={'area'}
                // setterObj = {dynamicButtonConfig?.area?.setterObj}
                visible = {'visible'}
                stateKey = {dynamicButtonConfig?.area?.buttonStateKey}
                dispatchFn = {context.filterDispatch}
              />
            </Paper>
          </Grid> 
          <Grid item xs={1} sm={1} md={1} maxWidth={'xs'} sx={ {minWidth:`${monthWidth}px`}}>
            <Paper elevation={0}>
              <ListInner 
                label={dynamicButtonConfig?.month.title} 
                buttons = {dynamicButtonConfig?.month.buttonData} 
                disabledStatus={false}
                exclusive={true}
                section={'month'}
                handleFormat = {handleFormat}
                value = {context.dataFilters.viewMonth}
                // setterObj = {dynamicButtonConfig?.month?.setterObj} 
                stateKey = {dynamicButtonConfig?.month?.buttonStateKey}
                dispatchFn = {context.filterDispatch}

              />
            </Paper>
          </Grid>
          <Grid item xs={1} sm={1} md={1} sx={{minWidth:'190px'}}>
            <Paper elevation={0}>
              <ListInner 
                label={dynamicButtonConfig?.year.title} 
                buttons = {dynamicButtonConfig?.year.buttonData} 
                disabledStatus={false}
                exclusive={true}
                section={'year'}
                handleFormat = {handleFormat}
                value = {context.dataFilters.viewYear}
                // setterObj = {dynamicButtonConfig?.year?.setterObj}
                stateKey = {dynamicButtonConfig?.year?.buttonStateKey}
                dispatchFn = {context.filterDispatch}

              />
            </Paper>
          </Grid>
          <Grid item xs={1} sm={1} md={1} sx={{minWidth:'290px'}}>
            <Paper elevation={0}>
              <ListInner 
                label={dynamicButtonConfig?.probability.title} 
                buttons = {dynamicButtonConfig?.probability.buttonData} 
                disabledStatus={false}
                exclusive={true}
                value={context.dataFilters.viewField}
                section={'viewField'}
                handleFormat = {handleFormat}
                // setterObj = {dynamicButtonConfig?.probability?.setterObj} 
                stateKey = {dynamicButtonConfig?.probability?.buttonStateKey}
                dispatchFn = {context.filterDispatch}

              />
            </Paper>
          </Grid>
                
            
          <Grid item xs={1} sm={1} md={1} sx={{minWidth:'160px'}}>
            <Paper elevation={0}>
              <ListInner 
                label={dynamicButtonConfig?.dataSource.title} 
                buttons = {dynamicButtonConfig?.dataSource.buttonData} 
                handleFormat = {handleFormat} 
                section={'dataSource'}
                value = {context.dataFilters.dataSource}
                disabledStatus={false}
                exclusive={true}
                // setterObj = {dynamicButtonConfig?.dataSource?.setterObj} 
                stateKey = {dynamicButtonConfig?.dataSource?.buttonStateKey}
                dispatchFn = {context.filterDispatch}

              />
            </Paper>
          </Grid>
          <Grid item xs={1} sm={1} md={1} >
            <Paper elevation={0}>
              <Residual />
            </Paper>
          </Grid>  
                
          
        </Grid>
      </Box>
      
    )
  }
  else{
    return(
      <>
      </>
    )
  }
}

function Residual(props){
  return(
    <>
      <Divider textAlign="left">
      <Typography variant="overline">
        Residual
      </Typography> 
      </Divider>
      <ListItem disablePadding>
        <Typography>Off</Typography>
          <Switch defaultChecked disabled={true} inputProps={{ 'aria-label': 'ant design' }} />
        <Typography>On</Typography> 
      </ListItem>
    </>
  )
}



function ListInner(props){
  // console.log('list inner props', props)
  return(
    <>
      <Divider textAlign="left">
      <Typography variant="overline">
        {props.label}
      </Typography> 
      </Divider>
      <ListItem disablePadding>
      <ToggleButtonGroup
        value={props.value ? props.value : []} 
        onChange={
          props.handleFormat 
            ? (event, newFormats)=> props.handleFormat(newFormats,props.stateKey, props.dispatchFn) 
            : (event, newFormats)=>(console.log('no click handler', 'event', event, 'newFormats', newFormats))}
        aria-label="text formatting"
        color="primary"
        disabled = {props.disabledStatus}
        exclusive = {props.exclusive}
        fullWidth= {true}
      >
          {
            props.buttons.map(
              (currButton, i)=>
              <ToggleButton key={i} value={currButton.abbrev} aria-label={currButton.abbrev} sx={{height:35}} disabled = {false}>
              <Typography sx={{fontSize:"0.7rem"}}>
                {currButton.label}
              </Typography>
              </ToggleButton>
            )
          }
        </ToggleButtonGroup>             
      </ListItem>
    </>
  )
}

function getButtonVariant(filteredBasinAr, currBasinAbbrev){
  return currBasinAbbrev && filteredBasinAr && filteredBasinAr.indexOf(currBasinAbbrev) >=0 ? 'contained' : 'outlined'
}



function makeButtonConfig(dataForConfig){
  class ButtonConstructor {
    constructor(dataAr, title, labelObj, buttonStateKey) {
      this.title = title
      this.dataAr = dataAr
      this.labelObj = labelObj
      this.buttonStateKey = buttonStateKey 
    }
    noLabelFn(){return this.dataAr.map(curr => { return { label: curr, abbrev: curr } })}
    labelFn(){return this.dataAr.map(curr => { return { label: this.labelObj[curr], abbrev: curr } })}
    get buttonObj(){
      const buttonData = this.labelObj ? this.labelFn() : this.noLabelFn()
      // console.log('gutton dta from button obj', buttonData, 'this in buttonObj', this)
      // console.log('returnig this', {title: this.title, buttonData, setterObj: this.setterObj})
      return {title: this.title, buttonData, buttonStateKey:this.buttonStateKey}
    }

  }


  const dynamicMasterObj = Object.create({})
  for(const [key, value] of Object.entries(dataForConfig)){
    const constructorReturn = new ButtonConstructor(value.dataAr, value.title, value.labelObj,  value.buttonStateKey)
    dynamicMasterObj[key] =constructorReturn.buttonObj
  }
  return dynamicMasterObj
}

// const dataForConfig = {
//   area: {
//     title: 'Area',
//     dataAr: areaAr,
//     labelObj: areaLabelObj
//   },
//   probability: {
//     title: 'Probability',
//     dataAr: probCategories,
//     labelObj: probabilityLabelObj
//   },
//   year:{
//     title: 'Year',
//     dataAr : Object.keys(dataDates).sort((a,b)=>b-a),
//   },
//   month:{
//     title: 'Month',
//     dataAr: dataDates[2022]['months'].sort((a,b)=>a-b),
//     labelObj: monthLabelObj
//   },
//   dataSource: {
//     title: 'Data Source',
//     dataAr: ['both', 'nrcs'],
//     labelObj: dataSourceLabelObj
//   }
// }
