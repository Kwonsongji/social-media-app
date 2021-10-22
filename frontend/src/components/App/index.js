import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './index.scss';

import NavBar from '../NavBar';
import Home from '../Home';
import Login from '../Auth/Login';
import Register from '../Auth/Register';


const App = () => {
  return (
    <Router>
     <Container>
        <NavBar/> {/* sur toutes les p */}
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register}/>
      </Container>
  </Router>
  );
}

export default App;
