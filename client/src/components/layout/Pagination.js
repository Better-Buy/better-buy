import React from "react"
import { Grid } from "@mui/material"

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
        marginTop: "2vh",
        marginBottom: "15vh",
      }}
    >
      {pageNumbers.map((number) => (
        <Grid item key={number} className="page-item">
          <button
            className="page-link"
            onClick={() => paginate(number)}
            style={{
              margin: "1rem",
              color: "var(--primary)",
              fontSize: "19.20px",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            {number}
          </button>
        </Grid>
      ))}
    </Grid>
  )
}

export default Pagination
