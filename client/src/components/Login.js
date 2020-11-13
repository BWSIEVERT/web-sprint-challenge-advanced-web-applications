import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../utilities/axiosWithAuth'

const initialCredentials = {
  credentials: {
    username: '',
    password: '',
  }
}

const Login = () => {
  const [ state, setState ] = useState(initialCredentials);

  const history = useHistory();

  const handleChange = (e) => {
    setState({
      ...state,
      credentials: {
        ...state.credentials,
        [e.target.name]: e.target.value
      }
    })
  }

  const login = (e) => {
    e.preventDefault();
    axiosWithAuth()
    .post('/api/login', state.credentials)
    .then((res) => {
      console.log(res)
      localStorage.setItem('token', res.data.payload);
      history.push('/BubblePage')
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div>
        <form onSubmit={login}>
          <input
            type="text"
            name="username"
            value={state.credentials.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            type="text"
            name="password"
            value={state.credentials.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <input type="submit" />
        </form>
      </div>
  );
};

export default Login;
