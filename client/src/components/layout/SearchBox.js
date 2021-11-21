import React, { useState } from 'react'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import { useStoreContext } from '../../utils/GlobalState'
import { SET_SEARCH_VALUE } from '../../utils/actions'

export default function SearchBox() {
  const [state, dispatch] = useStoreContext()

  const handleTextChange = (e) => {
    dispatch({
      type: SET_SEARCH_VALUE,
      field: e.target.name,
      payload: e.target.value,
    })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    window.location.assign('/search')
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Box className="search" sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="Search Better Buy"
          variant="standard"
          size="small"
          name="searchField"
          onChange={(e) => handleTextChange(e)}
        />
      </Box>
    </form>
  )
}
