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
import Products from './components/pages/Products';
import ProductItem from './components/pages/ProductItem'
import CreateProduct from './components/pages/CreateProduct';
import { setContext } from '@apollo/client/link/context';

import PrivateRoute from './components/routing/PrivateRoute';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from "use-shopping-cart";
import { Toaster } from 'react-hot-toast';
import { StoreProvider } from './utils/GlobalState';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';

// import AuthState from './context/auth/authState';
// import AlertState from './context/alert/AlertState';
// import Alerts from './components/layout/Alerts';

// //Amir  token
// import setAuthToken from './utils/setAuthToken';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
} from '@apollo/client';

const stripePromise = loadStripe('pk_test_51Jq4qZGzUjXx6ZT6RJDT6629lmeCT3QuFPg4JrDbQML31wlbTIKlZhRRvaYQBuiHFDI5jGbA36gPCadnZ1SgcCGk00rncH3LQT');

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
      <CartProvider
        mode="checkout-session"
        stripe={stripePromise}
        currecty="USD"
      > 

    {/* <AuthState>

      <AlertState> */}
        <Router>
          <Fragment className="App">
          <StoreProvider>
            <Navbar />
            <Toaster position="bottom-center"/>
            <SearchBar />
            <div className='container'>
              {/* <Alerts /> */}
              <Switch>
                 <Route exact path='/' component={Home} />
                {/* Amir path to Home will direct to login page if not logged in*/}
                {/* <PrivateRoute exact path='/' component={Home} />               */}
                <Route exact path='/Products' component={Products} />
                <Route exact path='/login' component={Login} />
                {/* <Route exact path='/register' component={Register} /> */}
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/about' component={About} />
                <Route exact path='/products/:sku' component={ProductItem} />
              </Switch>
            </div>
            </StoreProvider>
          </Fragment>
        </Router>
      {/* </AlertState>


    </AuthState>
      </CartProvider>
   </ApolloProvider>
  );
}

export default App;
