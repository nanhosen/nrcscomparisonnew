import './App.css';
// import '../public/favicon.ico';
import DataProvider from './providers/DataProvider'
// import TableHeader from './components/TableHeader'
import TableArea from './components/TableArea'
// import Main from './components/Main'
// import DataDisplayTable from './components/DataDisplayTableXData'
// import DataDisplayTable from './components/DataDisplayTable'
// import FilterArea from './components/FilterAreaPreRefactor'
import FilterArea from './components/FilterArea'
import Header from './components/HeaderIcons'
import DisclaimerBox from './components/DisclaimerBox'
import { Grid, Box, Divider, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { hot } from "react-hot-loader";
import React, { Component } from "react";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import "@fontsource/quattrocento-sans"
import "@fontsource/lora"
import "@fontsource/raleway"
import "@fontsource/arvo"
import "@fontsource/fjalla-one" //maybe
import "@fontsource/hind" //
import "@fontsource/karla" //
import "@fontsource/montserrat" //maybe if condensed
import "@fontsource/nunito" //
import "@fontsource/open-sans" // maybe if smaller
import "@fontsource/oxygen" // maybe if smaller
// @fontsource/aileron": "^4.5.3",
//     "@fontsource/arvo": "^4.5.5",
//     "@fontsource/cardo": "^4.5.7",
//     "@fontsource/fjalla-one": "^4.5.7",
//     "@fontsource/hind": "^4.5.6",
//     "@fontsource/karla": "^4.5.5",
//     "@fontsource/lora": "^4.5.6",
//     "@fontsource/montserrat": "^4.5.7",
//     "@fontsource/nunito": "^4.5.8",
//     "@fontsource/open-sans": "^4.5.8",
//     "@fontsource/oxygen": "^4.5.5",
//     "@fontsource/quattrocento-sans": "^4.5.5",
//     "@fontsource/raleway": "^4.5.5",
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: purple[500],
//     },
//     secondary: {
//       main: green[500],
//     },
//   },
// });
// 
// fontFamily: '"fjalla-one", "Roboto", "Helvetica", "Arial", sans-serif',
const theme = createTheme({
  typography: {
    // fontFamily: 'Roboto',
    h6: {

      // fontFamily: 'Roboto',
      fontFamily: '"montserrat"',
    }
  },
});

function App() {
  const buttonArray1 = ['CBRFC','Green','Colorado','San Juan','Great','Sevier','Virgin','Lower Colorado']
  const buttonArray2 = ['Min 90','P 70','Most Prob','P 30','Max 10']
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <DataProvider>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={1} >
            <Grid item xs={12} sm={12} lg={12}>
              <Header />
              <FilterArea/>
            </Grid>
            <Grid item xs={12} sm={12} lg={12} >
              {/* <DisclaimerBox /> */}
              <Divider variant = "middle"/>
              <TableArea />
            </Grid>
          </Grid>
        </Box>
        </DataProvider>
      </ThemeProvider>
    </div>
  );
}
export default hot(module)(App);
// export default App;


    // <Box pl={5} pr={5} sx={{ width: '95%' }}>



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