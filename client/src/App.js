import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Product from './components/pages/Product';
import Signup from './components/pages/Signup';

function App() {
  return (
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
  );
}

export default App;
