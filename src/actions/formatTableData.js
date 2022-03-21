export default function formatTableData({serverData, dataSource, basinFilters, viewMonth}){

  const fullDataAr = []
  if(serverData.data){
    const fullDataset = serverData.data
    // console.log(fullDataset)
    var id = 0

    for (const [stnId, stnDataAr] of Object.entries(fullDataset)) {
      id = id + 1
      const stationData = stnDataAr[0]
      if(stationData){
        const {metadata, nrcsData: nrcsData1, diff: fullDiff, period, diffPct: fullPct,  stnNrcsData, ...notMetadata} = stationData
        const nrcsData = nrcsData1 ? nrcsData1 :
          stnNrcsData ?
            stnNrcsData : undefined
        let diffPct
        if(nrcsData && stationData.rfcData){
          if(typeof nrcsData === 'number' && typeof stationData.rfcData ==='number'){
            diffPct = Math.round(calcPercentDiff(nrcsData ,stationData.rfcData))
          }
        }
        // const diffPct = fullPct ? Math.round(fullPct) : undefined
        const diff = fullDiff? Math.round(fullDiff) : undefined
        const periodNum = period ? periodToNum(period) : undefined
        const formattedDataObj = {id, stnId, nrcsData, diffPct, diff, ...metadata, ...notMetadata, period:periodNum, fDate:`${viewMonth}-1-2022`}
        
        // console.log('formatted data obj', formattedDataObj)
        const hasFilters = checkForFilters(basinFilters, dataSource)
        // console.log('has FIlters', hasFilters, dataSource)
        if(hasFilters){
          const keepIgnoreObj = getDataSourceKeys(dataSource)
          const meetsBasin = filterBasin(formattedDataObj.basin, basinFilters)
          const meetsSource = checkKeepIgnore(formattedDataObj, keepIgnoreObj.keep, keepIgnoreObj.ignore, true)
          if(hasFilters === 'basin'&& meetsBasin){
            fullDataAr.push(formattedDataObj)
          }
          else if(hasFilters === 'both' && meetsBasin && meetsSource){
            fullDataAr.push(formattedDataObj)
          }
          else if(hasFilters === 'source'&& meetsSource){
            fullDataAr.push(formattedDataObj)
          }
          else{
            
          }
        }
        else{
          fullDataAr.push(formattedDataObj)
        }
      }  
    }
  }
  return fullDataAr
}



function getDataSourceKeys(dataSource){
  const crosswalkObj = {
    both:{keep:['rfcData', 'nrcsData'],ignore:[]},
    cbrfc:{keep:['rfcData'],ignore:['nrcsData']},
    nrcs:{keep:['nrcsData'],ignore:['rfcData']}
  }
  const keep = crosswalkObj[dataSource]['keep']
  const ignore = crosswalkObj[dataSource]['ignore']
  // console.log('keep', keep, 'ignore', ignore)
  // if(dataSource === 'nrcs'){
  //   setBasinFilters([])
  // }
  return {keep, ignore}
}










const monthNumObj = {
  1:'january',
  2:'february', 
  3:'march',
  4:'april',
  5:'may',
  6:'june',
  7:'july',
  8:'august',
  9:'september',
  10:'october',
  11:'november',
  12:'december'
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

function checkKeepIgnore(dataObj={}, keepAr=[], ignoreAr=[], strict=true){
    // console.log('is in array', 'keepAr', keepAr, 'ignoreAr', ignoreAr)
    // console.log('dataObj', dataObj)
    const arrayKeys = Object.keys(dataObj)
    let successCount = 0
    let failCount = 0
    for(var key in dataObj){
      // console.log('index of ', keepAr.indexOf(key), dataObj[key], dataObj, key)
      if(keepAr.indexOf(key) >=0 && dataObj[key]){
        successCount = successCount + 1
      }
      if(ignoreAr.indexOf(key) >=0 && dataObj[key]){
        failCount = failCount + 1
      }
    }

    const returnVal = strict ? successCount > 0 && failCount === 0 && successCount === keepAr.length : successCount > 0
    // console.log('returnVal', returnVal, 'successCount', successCount, 'failCount', failCount)
    return returnVal
  }

  function checkForFilters(basinFilters, dataSource){
    const hasBasinFilters = basinFilters && basinFilters.length > 0 ? true : false
    const hasSourceFilters = dataSource && dataSource!=='both' ? true : false
    if(!hasBasinFilters && !hasSourceFilters){
      return false
    }
    else{
      const filterTypes = hasBasinFilters && hasSourceFilters ? 'both'
        : hasBasinFilters
            ? 'basin' : 'source'
      return filterTypes      
    }

  }

  function filterBasin(currBasin, basinFilters){
    if(currBasin && basinFilters.indexOf(currBasin) >=0){
      return true
    }
    else{
      return false
    }
  }

  function calcPercentDiff(num1, num2){
    const minus = num1-num2
    const plus = (num1+num2)/2
    return minus/plus * 100
  }

  function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }