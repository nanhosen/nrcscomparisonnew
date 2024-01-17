// import AppBar from "@material-ui/core/AppBar";
// import Grid from "@material-ui/core/Grid";
// import { makeStyles } from "@material-ui/core/styles";
// import Toolbar from "@material-ui/core/Toolbar";
// import React from "react";
// import { Tabs } from "@material-ui/core";
// import Tab from "@material-ui/core/Tab"
import React, { Component } from "react";
import { styled } from '@mui/material/styles';
import { AppBar, Grid, Toolbar, Tabs, Tab, IconButton, Typography, Paper, Avatar, SvgIcon, Box, Divider, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ReactComponent as NrcsIcon } from '../icons/nrcsSvg.svg';
import { ReactComponent as NoaaIcon } from '../icons/noaaLogo.svg';
import { ClassNames } from "@emotion/react";
const useStyles = styled({
  root: {
    flexGrow: 1
  },
  logo: {
    width: 135,
    height: 43.54
  }
});



const Header = () => {
  return (
    <Box sx={{ bgcolor:'#edf4fbb8', border: 1, borderColor: '#e0e0e0' , borderRadius: '6px'  }}>
        <Toolbar variant="dense">
        {/* <Avatar
          alt="Remy Sharp"
          src={process.env.PUBLIC_URL + '/nrcsLogoSmall.png'}
          variant="square"
        /> */}
        <Box sx={{p:0.5}}>
        <Link href="https://www.cbrfc.noaa.gov/">
          <img height={'59px'} src= {process.env.PUBLIC_URL + '/cbrfcLogoSmallTrans.png'} className={useStyles.logo}/>
        </Link>
        </Box>
        <Divider />
        <Box sx={{p:0.5}}>
          <Link href="https://www.nrcs.usda.gov/wps/portal/nrcs/main/ut/snow/">
            <img height={'34px'}  src= {process.env.PUBLIC_URL + '/nrcsLogoSmallWide.png'} className={useStyles.logo}/>
          </Link>

        </Box>
        {/* <SvgIcon component={NrcsIcon} inheritViewBox /> */}
        {/* <SvgIcon component={NoaaIcon} inheritViewBox /> */}
        {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <img
            height={'45px'}
              src={
                process.env.PUBLIC_URL + '/cbrfcLogo.png'
              }
              alt="Bosch Logo"
            />
    
        </IconButton> */}

        </Toolbar>
    </Box>
  )
};

export default Header;