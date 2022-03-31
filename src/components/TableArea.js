import React, {useEffect, useContext} from 'react';
import TableContext from '../contexts/TableContext'
import DataDisplayTable from './DataDisplayTableXData'
// import BasinStatsDisplay from './BasinStatsDisplay';
import { LinearProgress } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function TableArea(){
  const context = useContext(TableContext)
  useEffect(()=>{ 

  },[context.loading, context.tableData, context.error])
  if(context.loading){
    return(
      <>
        <Typography variant="h6" gutterBottom component="div">
          Requesting Table Data
        </Typography>  
        <LinearProgress />
      </>
    )
  }
  else if(context.error){
    return(
      <>Data Request Error: {JSON.stringify(context.error)}</>
    )
  }
  else{
    return(
      <DataDisplayTable />
    )
  }

}
{/* <DataDisplayTable /> */}
{/* <BasinStatsDisplay /> */}