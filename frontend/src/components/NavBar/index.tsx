import React from 'react';
import { Link } from 'react-router-dom';

import { FiHome, FiCalendar, FiFilePlus, FiSearch } from 'react-icons/fi';
import { ContainerStyles, MenubarStyles, LeftMenu, RigthMenu } from './styles';

import LogoSmall from '../../assets/images/LogoSmall.svg';
import conected from '../../assets/images/conected.svg';
import conectedAtive from '../../assets/images/conectedActive.svg';

const NavBar: React.FC = () => {
  return (
    <MenubarStyles>
      <ContainerStyles>
        <LeftMenu>
          <Link to="/landing">
            <img src={LogoSmall} alt="Logo" className="logo" />
          </Link>
          <ul>
            <li className="icon active">
              <Link to="/landing">
                <FiHome color="FFF05A" size={22} title="Home" />
              </Link>
            </li>
            <li className="icon">
              <Link to="/landing">
                <FiCalendar color="FFF" size={22} title="Calendário" />
              </Link>
            </li>
            <li className="icon">
              <Link to="/landing">
                <FiFilePlus color="FFF" size={22} title="Criar Evento" />
              </Link>
            </li>
          </ul>
        </LeftMenu>
        <RigthMenu>
          <div className="boxSearch">
            <FiSearch size={20} color="000" />
            <input type="text" />
          </div>
          <div className="avatar">{/* <img src={} /> */}</div>
          <div className="conectedIconContainer">
            <img
              src={conected}
              alt="conected"
              className="conectedIcon"
              title="Conectado"
            />
          </div>
        </RigthMenu>
      </ContainerStyles>
    </MenubarStyles>
  );
};

export default NavBar;
