import React, { useState, useEffect } from 'react'
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery, useMutation } from '@apollo/client'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import { Grid } from '@mui/material'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { GET_USER } from '../../utils/queries'
import { UPDATE_USER } from '../../utils/mutations'
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants'

const Profile = ({ location, history }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const { loading: queryLoading, data, error: queryError } = useQuery(GET_USER)
  const [updateUser, { error: mutationError }] = useMutation(UPDATE_USER)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      window.location.assign('/login')
    } else {
      if (!user || !user.firstName || success) {
        try {
          dispatch({ type: USER_UPDATE_PROFILE_RESET })
          dispatch(getUserDetails(data.user))
        } catch (e) {
          console.log(e)
        }
      } else {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log('het')
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      try {
        const mutationResponse = await updateUser({
          variables: {
            _id: user._id,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
          },
        })

        const person = mutationResponse.data.updateUser.user
        const token = mutationResponse.data.updateUser.token
        const userData = { ...person, token }
        dispatch(updateUserProfile(userData))
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <div>
      {message && <Message variant="error">{message}</Message>}
      {}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Grid container>
          <Grid item container lg={3}>
            <form>
              <h1 className="profile-header">User Profile</h1>
              {success && <Message variant="success">Profile Updated</Message>}
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  className="name-text-field"
                  placeholder="First"
                  type="name"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  className="name-text-field"
                  placeholder="Last"
                  name="lastName"
                  type="name"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <input
                className="button"
                type="submit"
                value="Update"
                onClick={submitHandler}
              />
            </form>
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default Profile
