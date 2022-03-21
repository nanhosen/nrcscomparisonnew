const areaAr = ['GN', 'UC', 'SJ', 'SL', 'SV', 'VG', 'LC']
const areaLabelObj = {
  GN: 'Green',
  UC: 'Colorado',
  SJ: 'San Juan',
  SL: 'Great',
  SV: 'Sevier',
  VG:'Virgin',
  LC: 'Lower Colorado'
}

const probCategories = ['crn','c70','cmp','c30','crx']
const probabilityLabelObj = {
  crn: 'Min 90',
  c70: 'P 70',
  cmp: 'Most Prob',
  c30: 'P 30',
  crx: 'Max 10'
}

// const dataDates = {
//   2015: {months:[7,6,5,4,3,2,1]},
//   2016: {months:[6,5,4,3,2,1]},
//   2017: {months:[7,6,5,4,3,2,1]},
//   2018: {months:[7,6,5,4,3,2,1]},
//   2019: {months:[7,6,5,4,3,2,1]},
//   2020: {months:[7,6,5,4,3,2,1]},
//   2021: {months:[7,6,5,4,3,2,1]},
//   2022: {months:[3,2,1]},
// }

const dataDates = {
  2021: {months:[4,3,2,1]},
  2022: {months:[3,2,1]},
}
const monthLabelObj = {
  1: 'JAN',
  2: 'FEB',
  3: 'MAR',
  4:'APR',
  5:'MAY',
  6:'JUN',
  7:'JUL',
  8:'AUG',
  9:'SEP',
  10:'OCT',
  11:'NOV',
  12:'DEC'
}

const dataSourceLabelObj = {
  both: 'Both',
  nrcs: 'NRCS Only',
}

export {areaAr, areaLabelObj, probCategories, probabilityLabelObj, dataDates, monthLabelObj, dataSourceLabelObj}

//make sure the key names here match the key names in the setterObj const in the filter area file
export const dataForConfig = {
  area: {
    title: 'Area',
    dataAr: areaAr,
    labelObj: areaLabelObj,
    buttonStateKey: 'basinFilters'
  },
  probability: {
    title: 'Probability',
    dataAr: probCategories,
    labelObj: probabilityLabelObj,
    buttonStateKey: 'viewField'
  },
  year:{
    title: 'Year',
    dataAr : Object.keys(dataDates).sort((a,b)=>b-a),
    buttonStateKey: 'viewYear'
  },
  month:{
    title: 'Month',
    dataAr: dataDates[2022]['months'].sort((a,b)=>a-b),
    labelObj: monthLabelObj,
    buttonStateKey: 'viewMonth'
  },
  dataSource: {
    title: 'Data Source',
    dataAr: ['both', 'nrcs'],
    labelObj: dataSourceLabelObj,
    buttonStateKey: 'dataSource'
  }
}



///original config object. this is what gets created by the button constructor

// const areaData = {
//   area:{
//     title: 'Area',
//     buttonData:[
//       {
//         label: 'Green',
//         abbrev: 'GN'
//       },
//       {
//         label: 'Colorado',
//         abbrev: 'UC'
//       },
//       {
//         label: 'San Juan',
//         abbrev: 'SJ'
//       },
//       {
//         label: 'Great',
//         abbrev: 'SL'
//       },
//       {
//         label: 'Sevier',
//         abbrev: 'SV'
//       },
//       {
//         label:'Virgin',
//         abbrev: 'VG'
//       },
//       {
//         label: 'Lower Colorado',
//         abbrev: 'LC'
//       },
//     ]
//   },
//   probability:{
//     title: 'Probability',
//     buttonData:[
//       {
//         label: 'Min 90',
//         abbrev: 'crn'
//       },
//       {
//         label: 'P 70',
//         abbrev: 'c70'
//       },
//       {
//         label: 'Most Prob',
//         abbrev: 'cmp'
//       },
//       {
//         label: 'P 30',
//         abbrev: 'c30'
//       },
//       {
//         label: 'Max 10',
//         abbrev: 'crx'
//       }
//     ]
//   },
//   year:{
//     title: 'Year',
//     buttonData:[
//       {
//         label: 2022,
//         abbrev: 2022
//       },
//       {
//         label: 2021,
//         abbrev: 2021
//       },
//       {
//         label: 2020,
//         abbrev: 2020
//       },
//     ]
//   },
//   month:{
//     title: 'Month',
//     buttonData:[
//       {
//         label: 'JAN',
//         abbrev: 1
//       },
//       {
//         label: 'FEB',
//         abbrev: 2
//       },
//       {
//         label: 'MAR',
//         abbrev: 3
//       },
      
//     ]
//   },
//   dataSource:{
//     title: 'Data Source',
//     buttonData:[
//       {
//         label:'Both',
//         abbrev: 'both'
//       },

//       {
//         label:'NRCS Only',
//         abbrev: 'nrcs'
//       }
//     ]
//   }
// }