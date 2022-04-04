const colorObj = {
  neg100: '#00876c',
  neg80: '#4a9a83',
  neg60: '#74ae9c',
  neg40: '#9bc1b4',
  neg20: '#c2d5ce',
  abs0: '#e8e8e8',
  pos20: '#eac8c8',
  pos40: '#e9a8a8',
  pos60: '#e5888a',
  pos80: '#de656d',
  pos100: '#d43d51'
}

const colorObjPercent = {
  blw50:'#d43d51',
  pos70:'#e5888a',
  pos90:'#eac8c8',
  pos110:'#e8e8e8',
  pos130:'#74ae9c',
  pos150:'#4a9a83',
  abv150:'#00876c',
}

const otherThings = {
  na: '#E8E8E8'
}

const exportObject = (inputObjects)=>{
  console.log(Object.entries(inputObjects))
  const returnObject =
  {
    width: '100%', 
    height:'3500px',
    '& .super-app-theme--cell': {
      backgroundColor: '#E8E8E8',
      color: '#000000',
      fontWeight: '500',
    }
  }
  for(const objName in inputObjects){
    // console.log('sdf', key1, values)
    const objectData = inputObjects[objName]
    for(const category in objectData){
      const colorCode = objectData[category]
      const key = `& .super-app.${category}`
      const value = {
        backgroundColor: colorCode,
        color: '#000000',
        fontWeight: '500',
      }
      if(category === 'na'){
        // console.log('should ad pading')
        value.paddingLeft = '0px'
        // console.log(value, value, 'value')
      }
      returnObject[key]=value
    }
  }
  return returnObject
}

const initialObj = exportObject({colorObj, colorObjPercent, otherThings})
export {initialObj}