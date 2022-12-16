import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useMutation } from "@apollo/client"
import Auth from "../../utils/auth"
import { ADD_USER } from "../../utils/mutations"
import { register } from "../../actions/userActions"
import Message from "../layout/Message"
import Loader from "../layout/Loader"
import { useDispatch, useSelector } from "react-redux"

function Register(history) {
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/"

  useEffect(() => {
    if (userInfo) {
      window.location.assign(redirect)
    }
  }, [history, userInfo, redirect])

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  })
  const [message, setMessage] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState({
      ...formState,
      [name]: value,
    })
  }
  const [addUser, { error: apolloError }] = useMutation(ADD_USER)

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    if (formState.password !== formState.confirmPassword) {
      setMessage("Passwords do not match")
    } else {
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
        },
      })
      const user = mutationResponse.data.addUser.user
      const token = mutationResponse.data.addUser.token
      const userData = { ...user, token }
      dispatch(register(userData))
      Auth.login(token)
    }
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            className="name-text-field"
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            className="name-text-field"
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            className="name-text-field"
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
            className="name-text-field"
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-pwd">Confirm Password:</label>
          <input
            className="name-text-field"
            placeholder="******"
            name="confirmPassword"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error && <Message variant="error">{error}</Message>}
        {apolloError && <Message variant="error">{apolloError}</Message>}
        {message && <Message variant="error">{message}</Message>}
        {loading && <Loader />}
        <input
          type="submit"
          value="register"
          className="btn btn-primary btn-block"
        />
        <p>
          Already a member?&nbsp;
          <Link
            style={{
              background:
                "-webkit-linear-gradient(right,#FFB75A, var(--primary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
