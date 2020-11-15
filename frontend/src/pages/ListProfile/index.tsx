/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { RiArrowRightSLine } from 'react-icons/ri';
import { IoIosArrowDown } from 'react-icons/io';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { useAuth } from '../../hooks/AuthContext';
import {
  Container,
  Title,
  Eventos,
  TitleEvent,
  EventoItem,
  Profiles,
} from './styles';
import userEventImage from '../../assets/images/userEventImageDisable.svg';
import apiUF from '../../services/apiUFs';
import api from '../../services/api';

interface StateInterface {
  sigla: string;
  nome: string;
}
interface UserInterface {
  uf: string;
  id: string;
}
interface ProfileInterface {
  avatar: string;
  username: string;
  nome_perfil: string;
  city: string;
  uf: string;
  description: string;
}
const ListProfile: React.FC = () => {
  const [uf, setUf] = useState<string>();
  const [profiles, setProfiles] = useState<ProfileInterface[]>();
  const { user } = useAuth();
  const newUser = user as UserInterface;
  const [states, setStates] = useState<StateInterface[]>([
    {
      nome: '',
      sigla: '',
    },
  ]);
  useEffect(()=>{
    api.post(`artigo`, {}).then(response => {
      const { data } = response.data;
      setProfiles(data);
    });

  },[setProfiles])

  const handleStates = useCallback(() => {
    if (states.length === 1) {
      apiUF.get('/estados').then(response => {
        setStates(response.data);
      });
    } else {
      setStates([{ nome: '', sigla: '' }]);
    }
  }, [setStates, states]);

  const handleSubmitState = useCallback((newUf: string) => {
    api.post(`artigo`, {}).then(response => {
      const { data } = response.data;
      setProfiles(data);
    });
    setUf(newUf);
    setStates([]);
  }, [setProfiles]);
  const handleFavorite = useCallback(() => {
    /// chamada da api
  }, []);
  return (
    <>
      <header>
        <NavBar page="landing" />
      </header>
      <Container>
        <Title>
          <div className="StatesOptions">
            <HiLocationMarker size={30} color="#009CA0" />
            <p>
              { uf }
            </p>
            <button type="submit" onClick={handleStates}>
              {states.length === 1 ? (
                <RiArrowRightSLine
                  size={35}
                  color="#009CA0"
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <IoIosArrowDown
                  size={35}
                  color="#009CA0"
                  style={{ cursor: 'pointer' }}
                />
              )}
            </button>
            {states.length > 1 && (
              <ul>
                {states.map(state => {
                  return (
                    <li key={state.sigla}>
                      <button
                        type="button"
                        onClick={() => {
                          handleSubmitState(state.sigla);
                        }}
                      >
                        {state.sigla.toUpperCase()}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className="userOptions">
            <Link to="/landing">
              <img src={userEventImage} alt="Usuario Evento" />
            </Link>
            <div />
            <FaRegUserCircle
              size={30}
              color="#009CA0"
              style={{ cursor: 'pointer' }}
            />
          </div>
        </Title>
        <main>
          {
            profiles &&
            profiles.map( profile => (
              <Profiles>
                <img src={profile.avatar} alt="Perfil" />
              </Profiles>
            ))
          }

        </main>
      </Container>
    </>
  );
};
export default ListProfile;
