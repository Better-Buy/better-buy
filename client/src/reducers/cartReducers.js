import {
  CART_ADD_ITEM,
  CART_UPDATE_QUANTITY,
  CART_REMOVE_ITEM,
} from '../constants/cartConstants'

import { toast } from 'react-toastify'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const existItem = state.cartItems.find((x) => x.sku === item.sku)

      if (existItem) {
        toast.info(`Updated cart quantity for ${action.payload.name}`, {
          position: 'bottom-left',
        })
        return {
          ...state,
          cartItems: state.cartItems.map((product) =>
            product.sku === existItem.sku
              ? {
                  ...item,
                  qty: product.qty + item.qty,
                }
              : product
          ),
        }
      } else {
        toast.success(`${action.payload.name} Added to cart`, {
          position: 'bottom-left',
        })
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }

    case CART_UPDATE_QUANTITY:
      const info = action.payload
      return {
        ...state,
        cartItems: state.cartItems.map((product) =>
          product.sku === info.sku
            ? {
                ...info,
                qty: info.quantity,
              }
            : product
        ),
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product.sku !== action.payload
        ),
      }

    default:
      return state
  }
}
