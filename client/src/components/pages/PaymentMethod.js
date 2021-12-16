import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumb from '../layout/Breadcrumb'
import { savePaymentMethod } from '../../actions/cartActions'

const PaymentMethod = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    window.location.assign('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('Stripe')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    window.location.assign('/placeorder')
  }

  return (
    <>
      <Breadcrumb step1 step2 step3 />
      <div className="payment-method-container">
        <form onSubmit={submitHandler}>
          <h1 className="profile-header">Payment Method</h1>
          <h3>Select Method</h3>
          <div className="form-group">
            <input
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label>Stripe</label>
            {/*<br />
            <input
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label>Paypal or Credit Card</label>*/}
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

export default PaymentMethod
