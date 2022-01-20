import {
  CART_ADD_ITEM,
  CART_UPDATE_QUANTITY,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const addToCart = (item, qty) => (dispatch, getState) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: { ...item, qty },
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const updateCartQuantity = (item, quantity) => (dispatch, getState) => {
  dispatch({
    type: CART_UPDATE_QUANTITY,
    payload: { ...item, quantity },
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (sku) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: sku,
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
