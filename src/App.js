import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Components/Login/login';
import Register from './Components/Register/register';
import Home from './Components/HomePage/home';
import BokkingPage from './Components/BookingFolder/Banner/Banner';
import DeptList from './Components/BookingFolder/DeptList/DeptList';
import DocList from './Components/BookingFolder/DocList/docList';
import BookingForm from './Components/BookingFolder/BookingForm/bookingForm';
import ThankYou from './Components/BookingFolder/Confirm/ThankYou';
import Profile from './Components/Profile/profilePage'

class App extends Component {
  render() {
    return (
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exatc path="/profile" component={Profile} />
            <Route exact path="/banner" component={BokkingPage} />
            <Route exact path="/DeptList" component={DeptList} />
            <Route exact path="/DocList" component={DocList} />
            <Route exact path="/form" component={BookingForm} />
            <Route exact path="/ThankYou" component={ThankYou} />
          </Switch>
        </div>
    );
  }
}

export default App;
