import React, { useCallback, useEffect, useState } from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { RiArrowRightSLine } from 'react-icons/ri';
import { IoIosArrowDown } from 'react-icons/io';
import { FaRegUserCircle } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { useAuth } from '../../hooks/AuthContext';
import {
  Container,
  Title,
  Artigos,
  ArtigoItem,
  InformationArtigo,
  ImageArtigo,
  HeaderArtigo,
  Eventos,
  TitleEvent,
  EventoItem,
} from './styles';
import userEventImage from '../../assets/images/userEvents.svg';
import Select from '../../components/Select';
import apiUF from '../../services/apiUFs';
import api from '../../services/api';

interface StateInterface {
  sigla: string;
  nome: string;
}

interface ArtigosResponse {
  id: string;
  date: Date;
  nome_perfil: string;
  username: string;
  title: string;
  description: string;
  subtitle: string;
  avatar: string;
}

interface EventosResponse {
  id: string;
  address: string;
  title: string;
  description: string;
  avatar: string;
  date: string;
  nome_perfil: string;
  username: string;
  hora: string;
}

const Landig: React.FC = () => {
  const [artigos, setArtigos] = useState<ArtigosResponse[]>([]);
  const [eventos, setEventos] = useState<EventosResponse[]>([]);
  const [states, setStates] = useState<StateInterface[]>([
    {
      nome: '',
      sigla: '',
    },
  ]);
  const { user } = useAuth();

  useEffect(() => {
    api.post(`artigo`, {}).then(response => {
      const { data } = response.data;
      console.log(response);
    });
    api.post(`ListEvento`, {}).then(response => {
      const { data } = response.data;
      console.log(response);
    });
  }, []);

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
            <img src={userEventImage} alt="Usuario Evento" />
            <div />
            <Link to="/ListProfile">
              <FaRegUserCircle
                size={30}
                color="#c4c4c4"
                style={{ cursor: 'pointer' }}
              />
            </Link>
          </div>
        </Title>
        <main>
          <Artigos>
            <ArtigoItem>
              <InformationArtigo>
                <HeaderArtigo>
                  <div className="perfil">
                    <img src="" alt="" />
                    <p>
                      <strong> Sala Verde </strong>
                      <br />
                      <span> Startup</span>
                    </p>
                  </div>
                  <span>10 outubro, 2020</span>
                </HeaderArtigo>
                <body>
                  <h3>
                    Por que devemos criar uma rede de apoio entre os negócios
                    locais?
                  </h3>
                  <p>O impacto da colaboração no desenvolvimento individual</p>
                </body>
              </InformationArtigo>
              <ImageArtigo>
                <HeaderArtigo>
                  <span> Cambuí, MG</span>
                  {!!user && (
                    <button type="submit" onClick={handleFavorite}>
                      <AiFillStar size={25} color="#C4C4C4" />
                    </button>
                  )}
                </HeaderArtigo>
                <img src="" alt="" />
              </ImageArtigo>
            </ArtigoItem>
          </Artigos>
          {eventos.length &&
            eventos.map(evento => (
              <Eventos>
                <TitleEvent>eventos</TitleEvent>
                <EventoItem>
                  <span> </span>
                  <img src={evento.avatar} alt=" " />
                  <p>{evento.title}</p>
                </EventoItem>
              </Eventos>
            ))}
        </main>
      </Container>
    </>
  );
};
export default Landig;
