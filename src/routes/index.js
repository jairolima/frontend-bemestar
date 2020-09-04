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
import Doctor from '../pages/Profile/DoctorProfile';
import Adm from '../pages/Adm';
import SuperAdm from '../pages/SuperAdm';
import WhatsappConfirm from '../pages/WhatsappConfirm';
import ConfirmationSuccess from '../pages/WhatsappConfirm/ConfirmationSuccess';
import WhatsappCancel from '../pages/WhatsappCancel';
import ConfirmationCancel from '../pages/WhatsappCancel/ConfirmationCancel';

export default function Routes() {
  return (
    <Switch>
      <Route path="/signin" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/list" exact component={List} />

      <Route path="/" exact component={Booking} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/doctor" component={Doctor} isPrivate />
      <Route path="/adm" component={Adm} isPrivate />
      <Route path="/superadm" component={SuperAdm} isPrivate />

      <Route
        path="/wz/confirm/:bookingId"
        exact
        component={WhatsappConfirm}
      />
      <Route
        path="/wz/confirmation/true"
        exact
        component={ConfirmationSuccess}
      />

      <Route
        path="/wz/cancel/:bookingId"
        exact
        component={WhatsappCancel}
      />
      <Route
        path="/wz/confirmation/false"
        exact
        component={ConfirmationCancel}
      />


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
