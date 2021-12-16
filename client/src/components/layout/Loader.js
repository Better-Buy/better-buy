import React from 'react'
import { Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

const Loader = () => {
  return (
    <Grid container justifyContent="center" alignItems="flex-end">
      <CircularProgress style={{ marginTop: '25vh', marginBottom: '5vh' }} />
      &nbsp;
      <span style={{ marginTop: '25vh', marginBottom: '5vh' }}>Loading...</span>
    </Grid>
  )
}

export default Loader
