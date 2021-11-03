import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    // <div className="container my-1">
    //   <Link to="/signup">← Go to Signup</Link>

    //   <h2>Login</h2>
    <div className='form-container'>
      <h1>
          Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={handleFormSubmit}>
        {/* <div className="flex-row space-between my-2"> */}
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
        {/* <div className="flex-row space-between my-2"> */}
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
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        {/* <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div> */}
        <input type="submit" value="Login" className="btn btn-primary btn-block"/>
      </form>
    </div>
  );
}

export default Login;
