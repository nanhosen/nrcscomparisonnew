import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { initialObj } from '../styles/tableColors';

export default function DisclaimerBox() {
  const [open, setOpen] = React.useState(true);

  return (
      <Collapse in={open}>
        <Alert
          severity="info"
          variant='outlined'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          CBRFC and NRCS have independent water supply forecasting paradigms.  While both agencies maintain statistical water supply models, CBRFC relies primarily on a process-based simulation model which explicitly tracks important watershed hydrologic states, such as snowpack, soil moisture, and forecasted temperature and precipitation information.  Seasonal water supply forecasts are largely driven by ground-based observations from the NRCS SNOTEL network.  All model results are available to CBRFC and NRCS forecasters for consideration prior to release of official monthly forecasts.  Overlap in CBRFC and NRCS forecasts lends confidence considering the different approaches employed.  Differences in forecast methodology and development can result in published forecast differences, although these differences are usually minor in the context of the overall forecast uncertainty.

        </Alert>
      </Collapse>

  );
}