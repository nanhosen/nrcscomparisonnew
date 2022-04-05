import React, {useEffect, useContext, Suspense} from 'react';
import TableContext from '../contexts/TableContext'
// import SparklinesTable from './SparklinesTable'
import SparkLine from './Sparkline';
// import BasinStatsDisplay from './BasinStatsDisplay';
import { LinearProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
// import DataDisplayTable from './DataDisplayTableXData'
const DataDisplayTable = React.lazy(() => import('./DataDisplayTableXData'));
const SparklinesTable = React.lazy(() => import('./SparklinesTable'));

export default function TableArea(){
  const context = useContext(TableContext)
  useEffect(()=>{ 
    console.log('conext', context)
  },[context])
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
    if(context.tableType === 'data'){
      return <Suspense fallback={<div>Loading...</div>}>
        <DataDisplayTable />
      </Suspense>
    }
    else if(context.tableType === 'chart'){
      return <>
        <Suspense fallback={<div>Loading...</div>}>
          <SparklinesTable /> 
        </Suspense>
      </>
    }
    else{
      return(<>Invalid Table Type</>)
    }
    }
    
  }
  // <SparkLine data={[25, 29, 25, 23]} />
{/* <DataDisplayTable /> */}
{/* <BasinStatsDisplay /> */}