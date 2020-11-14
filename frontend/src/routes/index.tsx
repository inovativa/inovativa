import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Routes';
import Dashboard from '../pages/Dashboard/index';
import Landig from '../pages/Landing';
import Login from '../pages/Login/index';
import PageRegister from '../pages/Register/index';
import CreateEvent from '../pages/CreateEvent/index';
import CreateArtigo from '../pages/CreateArtigo/index';
import Profile from '../pages/Profile/index';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/Login" component={Login} />
      <Route path="/register" exact component={PageRegister} />
      <Route path="/Landing" component={Landig} />
      <Route path="/CreateEvent" component={CreateEvent} isPrivate />
      <Route path="/CreateArtigo" component={CreateArtigo} isPrivate />
      <Route path="/Profile" component={Profile} isPrivate />
    </Switch>
  );
};

export default Routes;
