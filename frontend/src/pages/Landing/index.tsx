/* eslint-disable react/jsx-one-expression-per-line */
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
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
import apiUF from '../../services/apiUFs';
import api from '../../services/api';

interface StateInterface {
  sigla: string;
  nome: string;
}

interface ArtigosResponse {
  id: string;
  data: Date;
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
  data: string;
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
      setArtigos(data);
    });
    api.post(`ListEvento`, {}).then(response => {
      const { data } = response.data;
      setEventos(data);
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

  const handleSubmitState = () => {
    api.post(`ListEvento`, {}).then(response => {
      const { data } = response.data;
      setEventos(data);
    });
    api.post(`artigo`, {}).then(response => {
      const { data } = response.data;
      setArtigos(data);
    });
  };
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
                      <button type="submit" onClick={handleSubmitState}>
                        {state.sigla.toUpperCase()}
                      </button>
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
            {artigos &&
              artigos.map(artigo => (
                <ArtigoItem>
                  <InformationArtigo>
                    <HeaderArtigo>
                      <div className="perfil">
                        <img src={artigo.avatar} alt="" />
                        <p>
                          <strong>{artigo.username} </strong>
                          <br />
                          <span> {artigo.nome_perfil}</span>
                        </p>
                      </div>
                      <span>{artigo.data}</span>
                    </HeaderArtigo>
                    <body>
                      <h3>{artigo.title}</h3>
                      <p>{artigo.description}</p>
                    </body>
                  </InformationArtigo>
                  <ImageArtigo>
                    <HeaderArtigo>
                      <span> {artigo.description}</span>
                      {!!user && (
                        <button type="submit" onClick={handleFavorite}>
                          <AiFillStar size={25} color="#C4C4C4" />
                        </button>
                      )}
                    </HeaderArtigo>
                    <img src={artigo.avatar} alt="" />
                  </ImageArtigo>
                </ArtigoItem>
              ))}
          </Artigos>
          <Eventos>
            <TitleEvent>eventos</TitleEvent>
            {eventos &&
              eventos.map(evento => (
                <>
                  <EventoItem>
                    <span>{evento.data} </span>
                    <img src={evento.avatar} alt=" " />
                    <p>{evento.title}</p>
                  </EventoItem>
                </>
              ))}
          </Eventos>
        </main>
      </Container>
    </>
  );
};
export default Landig;
