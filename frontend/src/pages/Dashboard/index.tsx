import React from 'react';
import { Link } from 'react-router-dom';
import { PageDashboard, GroupLinks } from './style';
import LogoContainer from '../../components/LogoContainer/index';

const Dashboard: React.FC = () => {
  return (
    <>
      <PageDashboard>
        <LogoContainer />
        <GroupLinks>
          <Link to="/register">cadastre-se</Link>
          <Link to="/landing">entrar como visitante</Link>
          <Link to="/login">entrar</Link>
        </GroupLinks>
      </PageDashboard>
    </>
  );
};

export default Dashboard;
