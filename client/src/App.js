import React, {Fragment} from 'react';
import './App.css';

// import Navbar from './components/Navbar';
// import SearchBar from './components/SearchBar'

// function App() {
//   return (
//     <div className="App">
//     <Navbar />
//     <SearchBar />
//     </div>

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import SearchBar from './components/layout/SearchBar'
import Home from './components/pages/Home';
import About from './components/pages/About';
// import Login from './components/pages/Login';
import Products from './components/pages/Products';
// import Signup from './components/pages/Signup';
import CreateProduct from './components/pages/CreateProduct';
import { setContext } from '@apollo/client/link/context';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import AuthState from './context/auth/authState';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const API_KEY = process.env.REACT_APP_API_KEY


function App() {
  return (
    
    <ApolloProvider client={client}>

    <AuthState>
      <Router>
        <Fragment className="App">
          <Navbar />
          <SearchBar />
          <div className='conainter'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/Products' component={Products} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </AuthState>
   </ApolloProvider>
  );
}

export default App;
