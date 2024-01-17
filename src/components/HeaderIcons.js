// import AppBar from "@material-ui/core/AppBar";
// import Grid from "@material-ui/core/Grid";
// import { makeStyles } from "@material-ui/core/styles";
// import Toolbar from "@material-ui/core/Toolbar";
// import React from "react";
// import { Tabs } from "@material-ui/core";
// import Tab from "@material-ui/core/Tab"
import React, { Component } from "react";
import { styled } from '@mui/material/styles';
import { AppBar, Grid, Toolbar, Tabs, Tab, IconButton, Typography, Paper,  SvgIcon, Box, Divider, Link, Button } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ReactComponent as NrcsIcon } from '../icons/usda-logo-white.svg';
import { ReactComponent as NoaaIcon } from '../icons/noaa-logo-svg.svg';
import { ClassNames } from "@emotion/react";
import { grey } from '@mui/material/colors';
const useStyles = styled({
  root: {
    flexGrow: 1
  },
  logo: {
    width: 135,
    height: 43.54
  }
});
const iconColor = grey[50]
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 14,
    maxWidth: 400,
  },
}));
// const CustomWidthTooltip = styled(({ className, ...props }) => (
//   <Tooltip {...props} classes={{ popper: className }} />
// ))({
//   [`& .${tooltipClasses.tooltip}`]: {
//     maxWidth: 500,
//     backgroundColor: theme.palette.common.white,
//     color: 'rgba(0, 0, 0, 0.87)',
//     boxShadow: theme.shadows[1],
//     fontSize: 11,
//   },
// });
const longText = `
CBRFC and NRCS have independent water supply forecasting paradigms.  While both agencies maintain statistical water supply models, CBRFC relies primarily on a process-based simulation model which explicitly tracks important watershed hydrologic states, such as snowpack, soil moisture, and forecasted temperature and precipitation information.  Seasonal water supply forecasts are largely driven by ground-based observations from the NRCS SNOTEL network.  All model results are available to CBRFC and NRCS forecasters for consideration prior to release of official monthly forecasts.  Overlap in CBRFC and NRCS forecasts lends confidence considering the different approaches employed.  Differences in forecast methodology and development can result in published forecast differences, although these differences are usually minor in the context of the overall forecast uncertainty.
`;

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor:'#0f355c'  }}>
        <Toolbar variant="dense">
        <Box sx={{ display: 'flex',
          flexDirection: 'row', flexGrow: 1 }}>
          <Link href="https://www.nrcs.usda.gov/wps/portal/nrcs/main/ut/snow/" target="_blank" rel="noopener">
              {/* <img height={'34px'}  src= {process.env.PUBLIC_URL + '/nrcsLogoSmallWide.png'} className={useStyles.logo}/> */}
              <SvgIcon component={NrcsIcon} inheritViewBox sx={{ pl: '5px', fontSize: 40}}  />
            </Link>
            <Link href="https://www.cbrfc.noaa.gov/" target="_blank" rel="noopener">
            {/* <img height={'59px'} src= {process.env.PUBLIC_URL + '/cbrfcLogoSmallTrans.png'} className={useStyles.logo}/> */}
            <SvgIcon component={NoaaIcon} inheritViewBox sx={{ pl: '10px', fontSize: 40}}  />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', }, pl: 2,mt:0.7,  fontSize: 22}}
          >
            NOAA & NRCS FORECAST COMPARISON TOOL
          </Typography>
        </Box>
        <LightTooltip 
          placement="left-end"
          // sx={{maxWidth:500}}
          title={<Typography>CBRFC and NRCS have independent water supply forecasting paradigms.  While both agencies maintain statistical water supply models, CBRFC relies primarily on a process-based simulation model which explicitly tracks important watershed hydrologic states, such as snowpack, soil moisture, and forecasted temperature and precipitation information.  Seasonal water supply forecasts are largely driven by ground-based observations from the NRCS SNOTEL network.  All model results are available to CBRFC and NRCS forecasters for consideration prior to release of official monthly forecasts.  Overlap in CBRFC and NRCS forecasts lends confidence considering the different approaches employed.  Differences in forecast methodology and development can result in published forecast differences, although these differences are usually minor in the context of the overall forecast uncertainty.</Typography>}
          >
          <IconButton sx={{ color: grey[50] }}>
            <ErrorOutlineIcon />
            <Typography variant="overline" sx={{pl: 0.3, fontSize: 12, mt:0.3}}>
              Forecasting Paradigms
            </Typography>
          </IconButton>
        </LightTooltip>
        </Toolbar>
      </AppBar>
    </Box>
  )
};

export default Header;


// <Box sx={{ bgcolor:'#092948b8', border: 1, borderColor: '#e0e0e0' , borderRadius: '6px', flexGrow: 1   }}>
// <AppBar position="static">
//  <Toolbar variant="dense">
//  {/* <Avatar
//    alt="Remy Sharp"
//    src={process.env.PUBLIC_URL + '/nrcsLogoSmall.png'}
//    variant="square"
//  /> */}
//  <Box sx={{ flexGrow: 1 }}>
//    {/* <Box sx={{p:0.5}}> */}
//      <Link href="https://www.cbrfc.noaa.gov/">
//        {/* <img height={'59px'} src= {process.env.PUBLIC_URL + '/cbrfcLogoSmallTrans.png'} className={useStyles.logo}/> */}
//        <SvgIcon component={NoaaIcon} inheritViewBox sx={{ fontSize: 40}}  />
//      </Link>
//    {/* </Box> */}
//    <Divider />
//    {/* <Box sx={{p:0.5}}> */}
//      <Link href="https://www.nrcs.usda.gov/wps/portal/nrcs/main/ut/snow/">
//        {/* <img height={'34px'}  src= {process.env.PUBLIC_URL + '/nrcsLogoSmallWide.png'} className={useStyles.logo}/> */}
//        <SvgIcon component={NrcsIcon} inheritViewBox sx={{ pl: '5px', fontSize: 40}}  />
//      </Link>
//    {/* </Box> */}
//  </Box>
//  <Button color="inherit">Login</Button>
//  {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
//  <img
//      height={'45px'}
//        src={
//          process.env.PUBLIC_URL + '/cbrfcLogo.png'
//        }
//        alt="Bosch Logo"
//      />

//  </IconButton> */}

//  </Toolbar>
// </AppBar>   
// </Box>