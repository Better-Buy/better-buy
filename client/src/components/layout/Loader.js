import React from 'react'
import { Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

const Loader = () => {
  return (
    <Grid container justifyContent="center" alignItems="flex-end">
      <CircularProgress style={{ marginTop: '25vh' }} />
      &nbsp;
      <span>Loading...</span>
    </Grid>
  )
}

export default Loader
