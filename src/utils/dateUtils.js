function monthUtils({monthArray, numberPeriod, textPeriod}={}, jsMonth = false){
  // if(!number || number<1 || number > 12){
  //   throw new Error(`invalid month ${number}`)
  // }
  // console.log('in month untisl', numberPeriod)
  function monthNumtoName(number){
    const monthNum = jsMonth ? number + 1 : number
    return {
      1: 'JAN',
      2: 'FEB',
      3: 'MAR',
      4: 'APR',
      5: 'MAY',
      6: 'JUN',
      7: 'JUL',
      8: 'AUG',
      9: 'SEP',
      10: 'OCT',
      11: 'NOV',
      12: 'DEC'
    }[monthNum]
  }
  function makeMonthNameString(month1, month2){
    return `${monthNumtoName(month1)}-${monthNumtoName(month2)}`
  }
  function numberPeriodtoStringPeriod(){
    const monthNum1 = numberPeriod.split("-")[0]
    const monthNum2 = numberPeriod.split("-")[1]
    console.log('monthNum1', monthNum1)
    console.log('monthNum2', monthNum2)
    // return `${monthNumtoName(monthNum1)}-${monthNumtoName(monthNum2)}`
  }
  function stringPeriodtoNumberPeriod(){

  }

  return(monthNumtoName, makeMonthNameString, numberPeriodtoStringPeriod)
}
function monthNumtoName(number, jsMonth = false){
  const monthNum = jsMonth ? number + 1 : number
  return {
    1: 'JAN',
    2: 'FEB',
    3: 'MAR',
    4: 'APR',
    5: 'MAY',
    6: 'JUN',
    7: 'JUL',
    8: 'AUG',
    9: 'SEP',
    10: 'OCT',
    11: 'NOV',
    12: 'DEC'
  }[monthNum]
}
function numberPeriodtoStringPeriod(numberPeriod){
  const monthNum1 = numberPeriod.split("-")[0]
  const monthNum2 = numberPeriod.split("-")[1]
  return `${monthNumtoName(monthNum1)}-${monthNumtoName(monthNum2)}`
}

export {numberPeriodtoStringPeriod}