import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@mui/material'

const Shipping = () => {
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    //window.location.assign('/payment')
  }

  return (
    <div className="form-container">
      <form onSubmit={(e) => submitHandler(e)}>
        <h1 className="profile-header">Shipping</h1>
        <div className="form-group">
          <label htmlFor="firstName">Address</label>
          <input
            className="name-text-field"
            placeholder="Enter address"
            type="name"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">City</label>
          <input
            className="name-text-field"
            placeholder="Enter city"
            type="name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Postal Code</label>
          <input
            className="name-text-field"
            placeholder="Enter postal code"
            type="name"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Country</label>
          <input
            className="name-text-field"
            placeholder="Enter country"
            type="name"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <input
          style={{
            marginBottom: '2vh',
          }}
          type="submit"
          value="Continue"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  )
}

export default Shipping
