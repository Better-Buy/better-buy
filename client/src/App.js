import React from "react"
import "./App.css"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import SearchBar from "./components/layout/SearchBar"
import Footer from "./components/layout/Footer"
import Home from "./components/pages/Home"
import Products from "./components/pages/Products"
import ProductItem from "./components/pages/ProductItem"
import SearchPage from "./components/pages/SearchPage"
import Profile from "./components/pages/Profile"
import Cart from "./components/pages/Cart"
import Shipping from "./components/pages/Shipping"
import PaymentMethod from "./components/pages/PaymentMethod"
import PlaceOrder from "./components/pages/PlaceOrder"
// import CreateProduct from './components/pages/CreateProduct';
import { setContext } from "@apollo/client/link/context"

// import PrivateRoute from './components/routing/PrivateRoute';
import { loadStripe } from "@stripe/stripe-js"
import { CartProvider } from "use-shopping-cart"
import { Toaster } from "react-hot-toast"
//import { StoreProvider } from './utils/GlobalState'
import Register from "./components/pages/Register"
import Login from "./components/pages/Login"

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client"

const stripePromise = loadStripe(
  "pk_test_51Jq4qZGzUjXx6ZT6RJDT6629lmeCT3QuFPg4JrDbQML31wlbTIKlZhRRvaYQBuiHFDI5jGbA36gPCadnZ1SgcCGk00rncH3LQT"
)

const httpLink = createHttpLink({
  uri: "/graphql",
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <CartProvider
        mode="checkout-session"
        stripe={stripePromise}
        currecty="USD"
      >
        <Router>
          <ToastContainer />
          <div className="App">
            <Navbar />
            <Toaster position="bottom-center" />
            <SearchBar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                {/* Amir path to Home will direct to login page if not logged in*/}
                {/* <PrivateRoute exact path='/' component={Home} />               */}
                <Route exact path="/Products" component={Products} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/search" component={SearchPage} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/shipping" component={Shipping} />
                <Route exact path="/placeorder" component={PlaceOrder} />
                <Route exact path="/payment-method" component={PaymentMethod} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/products/:sku" component={ProductItem} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ApolloProvider>
  )
}

export default App
