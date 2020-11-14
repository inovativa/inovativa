import React from 'react';
import { LogoContainerStyles } from './styles';
import logo from '../../assets/images/logo.svg';

const LogoContainer: React.FC = ({ children }) => {
  return (
    <>
      <LogoContainerStyles>
        <img src={logo} alt="Logo" />
        {children}
      </LogoContainerStyles>
    </>
  );
};

export default LogoContainer;
