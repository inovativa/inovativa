import React, { useCallback, useState } from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { RiArrowRightSLine } from 'react-icons/ri';
import { IoIosArrowDown } from 'react-icons/io';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
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

interface StateInterface {
  sigla: string;
  nome: string;
}
const ListProfile: React.FC = () => {
  const [states, setStates] = useState<StateInterface[]>([
    {
      nome: '',
      sigla: '',
    },
  ]);

  const handleStates = useCallback(() => {
    if (states.length === 1) {
      apiUF.get('/estados').then(response => {
        setStates(response.data);
      });
    } else {
      setStates([{ nome: '', sigla: '' }]);
    }
  }, [setStates, states]);

  const handleSubmit = useCallback(() => {
    /// ///Chamada da API
  }, []);
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
            <p> Cambuí, MG</p>
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
                      <Link to="api">{state.sigla.toUpperCase()}</Link>
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
          <Profiles />
          <Eventos>
            <TitleEvent>eventos</TitleEvent>
            <EventoItem>
              <span> 20 de nov, 2020, 14:30h </span>
              <img src="" alt=" " />
              <p>Palestra: Técnicas de storytelling e como aplicá-las </p>
            </EventoItem>
          </Eventos>
        </main>
      </Container>
    </>
  );
};
export default ListProfile;
