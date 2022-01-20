import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import './Breadcrumb.css'

const Breadcrumb = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="breadcrumb-container">
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        {step1 ? (
          <Grid item>
            <Link to="/login" className="active-link">
              Sign In
            </Link>
          </Grid>
        ) : (
          <Grid item className="inactive-link">
            Sign In
          </Grid>
        )}
        <Grid item className="breadcrumb-seperator">
          {'>'}
        </Grid>
        {step2 ? (
          <Grid item>
            <Link to="/shipping" className="active-link">
              Shipping
            </Link>
          </Grid>
        ) : (
          <Grid item className="inactive-link">
            Shipping
          </Grid>
        )}
        <Grid item className="breadcrumb-seperator">
          {'>'}
        </Grid>
        {step3 ? (
          <Grid item>
            <Link to="/payment" className="active-link">
              Payment
            </Link>
          </Grid>
        ) : (
          <Grid item className="inactive-link">
            Payment
          </Grid>
        )}
        <Grid item className="breadcrumb-seperator">
          {'>'}
        </Grid>
        {step4 ? (
          <Grid item>
            <Link to="/placeorder" className="active-link">
              Place Order
            </Link>
          </Grid>
        ) : (
          <Grid item className="inactive-link">
            Place Order
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default Breadcrumb
