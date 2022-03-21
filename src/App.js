import logo from './logo.svg';
import './App.css';
import DataProvider from './providers/DataProvider'
// import TableHeader from './components/TableHeader'
import TableArea from './components/TableArea'
// import Main from './components/Main'
// import DataDisplayTable from './components/DataDisplayTableXData'
// import DataDisplayTable from './components/DataDisplayTable'
// import FilterArea from './components/FilterAreaPreRefactor'
import FilterArea from './components/FilterArea'
import DisclaimerBox from './components/DisclaimerBox'
import { Grid, Box, Divider } from '@mui/material';


function App() {
  const buttonArray1 = ['CBRFC','Green','Colorado','San Juan','Great','Sevier','Virgin','Lower Colorado']
  const buttonArray2 = ['Min 90','P 70','Most Prob','P 30','Max 10']
  return (
    <div className="App">
    <DataProvider>
    <Box pl={5} pr={5} sx={{ width: '95%' }}>
      <Grid container spacing={1} >
        <Grid item xs={12} sm={12} lg={12}>
          <FilterArea/>
        </Grid>
        <Grid item xs={12} sm={12} lg={12} >
          <DisclaimerBox />
          <Divider variant = "middle"/>
          <TableArea />
        </Grid>
      </Grid>
    </Box>
    </DataProvider>
    </div>
  );
}

export default App;





// <Box sx={{ width: '100%' }}>
// <Grid container spacing={1} >
//   <Grid item xs={12} sm={3} lg={2}>
//     <StnInfoTable />
//   </Grid>
//   <Grid item xs={12} sm={6} lg={8} ref={chartRef}>
//     <Card>
//       <CardContent>
//         <CurveChart refWid={chartWidth} />
//       </CardContent>
//     </Card>
//   </Grid>
//   <Grid item xs={12} sm={3} lg={2} ref={componentRef}>
//     <DataTable refWid={refWidth} />
//   </Grid>
// </Grid>
// </Box>