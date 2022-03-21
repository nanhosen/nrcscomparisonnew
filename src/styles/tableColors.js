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
const initialObj =
{
  width: '100%', 
  height:'3500px',
  '& .super-app-theme--cell': {
    backgroundColor: '#E8E8E8',
    color: '#000000',
    fontWeight: '500',
  }
}
for(const category in colorObj){
  const colorCode = colorObj[category]
  const key = `& .super-app.${category}`
  const value = {
    backgroundColor: colorCode,
    color: '#000000',
    fontWeight: '500',
  }
  initialObj[key]=value
}

export {initialObj}