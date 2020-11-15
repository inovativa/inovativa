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
import ListProfile from '../pages/ListProfile';
import Perfil from '../pages/Perfil';
import Artigo from '../pages/Artigo';
import Evento from '../pages/Evento';

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
      <Route path="/ListProfile" component={ListProfile} />
      <Route path="/Artigo/:id" component={Artigo} />
      <Route path="/Perfil/:id" component={Perfil} />
      <Route path="/Evento/:id" component={Evento} />
    </Switch>
  );
};

export default Routes;
