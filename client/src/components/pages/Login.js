import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../utils/mutations'
import Auth from '../../utils/auth'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import { userLogin } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import auth from '../../utils/auth'

const userLoginAction = userLogin

function Login(history) {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error }] = useMutation(LOGIN)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userInfo } = userLogin

  const redirect = window.location.search
    ? window.location.search.split('=')[1]
    : '/'

  useEffect(() => {
    if (auth.loggedIn()) {
      window.location.assign(redirect)
    }
  }, [history, userInfo, redirect])

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      })
      const user = mutationResponse.data.login.user
      const token = mutationResponse.data.login.token
      const userData = { ...user, token }
      dispatch(userLoginAction(userData))
      Auth.login(token)
    } catch (e) {
      console.log(e)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error && <Message variant="error">Invalid email or password</Message>}
        {loading && <Loader />}
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
        <p
          style={{
            marginLeft: '15px',
          }}
        >
          Not a member yet?&nbsp;
          <Link
            style={{
              color: 'var(--primary)',
            }}
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
