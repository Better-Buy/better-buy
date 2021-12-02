import React from 'react'
import { Grid } from '@mui/material'

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className="pagination"
      style={{
        marginTop: '2vh',
      }}
    >
      {pageNumbers.map((number) => (
        <Grid item key={number} className="page-item">
          <a
            className="page-link"
            onClick={() => paginate(number)}
            href="#"
            style={{
              margin: '1rem',
              color: 'var(--primary)',
              fontSize: '19.20px',
            }}
          >
            {number}
          </a>
        </Grid>
      ))}
    </Grid>
  )
}

export default Pagination
