import React from 'react';
import { Link } from 'react-router-dom';

import { FiHome, FiCalendar, FiFilePlus, FiSearch } from 'react-icons/fi';
import { ContainerStyles, MenubarStyles, LeftMenu, RigthMenu } from './styles';

import LogoSmall from '../../assets/images/LogoSmall.svg';
import conected from '../../assets/images/conected.svg';
import { useAuth } from '../../hooks/AuthContext';
// import conectedAtive from '../../assets/images/conectedActive.svg';

interface NavBarProps {
  page: string;
}
interface userAuthentcate {
  avatar_front?: string;
}

const NavBar: React.FC<NavBarProps> = ({ page }) => {
  const { user } = useAuth();
  const newUser = user as userAuthentcate;
  return (
    <MenubarStyles>
      <ContainerStyles>
        <LeftMenu>
          <Link to="/landing">
            <img src={LogoSmall} alt="Logo" className="logo" />
          </Link>
          <ul>
            <li className={page === 'landing' ? 'icon active' : 'icon'}>
              <Link to="/landing">
                <FiHome
                  color={page === 'landing' ? 'FFF05A' : 'FFFFFF'}
                  size={22}
                  title="Home"
                />
              </Link>
            </li>
            {user && (
              <li className={page === 'createEvent' ? 'icon active' : 'icon'}>
                <Link to="/createEvent">
                  <FiCalendar
                    color={page === 'createEvent' ? 'FFF05A' : 'FFFFFF'}
                    size={22}
                    title="Criar Evento"
                  />
                </Link>
              </li>
            )}
            {user && (
              <li className={page === 'createArtigo' ? 'icon active' : 'icon'}>
                <Link to="/createArtigo">
                  <FiFilePlus
                    color={page === 'createArtigo' ? 'FFF05A' : 'FFFFFF'}
                    size={22}
                    title="Criar Artigo"
                  />
                </Link>
              </li>
            )}
          </ul>
        </LeftMenu>
        <RigthMenu>
          <div className="boxSearch">
            <FiSearch size={20} color="000" />
            <input type="text" />
          </div>
          {user && (
            <div className={page === 'profile' ? 'avatar active' : 'avatar'}>
              <Link to="/profile">
                <img
                  src={newUser.avatar_front}
                  alt="avatar"
                  className="avatarImage"
                  title="Avatar"
                />
              </Link>
            </div>
          )}
          {user && (
            <div className="conectedIconContainer">
              <img
                src={conected}
                alt="conected"
                className="conectedIcon"
                title="Conectado"
              />
            </div>
          )}
        </RigthMenu>
      </ContainerStyles>
    </MenubarStyles>
  );
};

export default NavBar;
