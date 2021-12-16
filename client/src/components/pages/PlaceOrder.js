import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumb from '../layout/Breadcrumb'
import Message from '../layout/Message'

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart)
  return (
    <>
      <Breadcrumb step1 step2 step3 step4 />
      <div>place order</div>
    </>
  )
}

export default PlaceOrder
