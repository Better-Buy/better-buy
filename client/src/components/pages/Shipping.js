import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../../actions/cartActions'
import Breadcrumb from '../layout/Breadcrumb'

const Shipping = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    console.log('hello')
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    window.location.assign('/payment-method')
  }

  return (
    <>
      <Breadcrumb step1 step2 />
      <div className="shipping-container" style={{ marginBottom: '2rem' }}>
        <form onSubmit={submitHandler}>
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
    </>
  )
}

export default Shipping
