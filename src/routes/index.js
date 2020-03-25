import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Booking from '../pages/Booking';
import List from '../pages/List';
import Confirm from '../pages/Confirm';
import SelectDateTime from '../pages/SelectDateTime';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/list" exact component={List} />

      <Route path="/booking" exact component={Booking} isPrivate />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />

      <Route
        path="/confirm/:time/:providerId/:providerName"
        component={Confirm}
        isPrivate
      />
      <Route
        path="/selectdatetime/:providerId/:providerName"
        component={SelectDateTime}
        isPrivate
      />
    </Switch>
  );
}
