import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Product from './components/pages/Product';
import Signup from './components/pages/Signup';
import CreateProduct from './components/pages/CreateProduct';
import { setContext } from '@apollo/client/link/context';

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

function App() {
  return (
     <ApolloProvider client={client}>
    <AuthState>
      <Router>
        <Fragment className="App">
          <Navbar />
          <div className='conainter'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/Product' component={Product} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
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
