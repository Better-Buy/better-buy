import React from 'react'
import { useHistory } from 'react-router-dom'
import Message from '../layout/Message'
import { Grid } from '@mui/material'
import './Cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateCartQuantity, removeFromCart } from '../../actions/cartActions'

const trashIcon = <FontAwesomeIcon icon={faTrash} />

const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const history = useHistory()
  const dispatch = useDispatch()

  const removeFromCartHandler = (sku) => {
    dispatch(removeFromCart(sku))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <div>
      <h1 className="cart-header">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty&nbsp;-&nbsp;
          <button
            className="back-button"
            onClick={() => {
              history.goBack()
            }}
          >
            Go back
          </button>
        </Message>
      ) : (
        <Grid container alignItems="flex-start" spacing={12}>
          <Grid item container lg={8}>
            {cartItems.map((item) => (
              <Grid
                item
                container
                spacing={2}
                m={1}
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                key={item.sku}
              >
                <Grid alignSelf="center" lg={1}>
                  <img src={item.image} alt={item.name} />
                </Grid>
                <Grid
                  item
                  lg={4}
                  alignSelf="center"
                  className="cart-product-name"
                >
                  <Link to={`products/${item.sku}`}>{item.name}</Link>
                </Grid>

                <Grid className="cart-price" item alignSelf="center" lg={2}>
                  ${item.price}
                </Grid>
                <Grid item alignSelf="center" lg={1}>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(updateCartQuantity(item, Number(e.target.value)))
                    }
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select>
                </Grid>
                <Grid item alignSelf="center" lg={2}>
                  <Button
                    className="remove-button"
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => removeFromCartHandler(item.sku)}
                  >
                    {trashIcon}&nbsp;Remove
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            lg={4}
          >
            <Grid item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
            </Grid>
            <Grid item>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                disabled={cartItems.length === 0}
                style={{
                  backgroundColor: '#FFB75A',
                  color: '#0b3278',
                  fontFamily: 'now bold',
                }}
                className="add-item-buttom"
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default Cart
