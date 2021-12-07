import {
  CART_ADD_ITEM,
  CART_UPDATE_QUANTITY,
  CART_REMOVE_ITEM,
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
