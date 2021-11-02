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
import CreateProduct from './components/pages/CreateProduct';
import { setContext } from '@apollo/client/link/context';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from "use-shopping-cart";
import { Toaster } from 'react-hot-toast';

import AuthState from './context/auth/authState';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';

//Amir  token
import setAuthToken from './utils/setAuthToken';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
} from '@apollo/client';

const queryClient = new QueryClient();
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




// Amir Token
if(localStorage.token) {
  setAuthToken(localStorage.token);
}


function App() {
  return (
    <ApolloProvider client={client}>
      <CartProvider
        mode="checkout-session"
        stripe={stripePromise}
        currecty="USD"
      > 

    <AuthState>

      <AlertState>
        <Router>
          <Fragment className="App">
            <Navbar />
            <Toaster position="bottom-center"/>
            <SearchBar />
            <div className='conainter'>
              <Alerts />
              <Switch>
                <Route exact path='/' component={Home} />
                {/* Amir path to Home will direct to login page if not logged in*/}
                {/* <PrivateRoute exact path='/' component={Home} />               */}
                <Route exact path='/Product' component={Product} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/about' component={About} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </AlertState>

    </AuthState>
      </CartProvider>
   </ApolloProvider>
  );
}

export default App;
