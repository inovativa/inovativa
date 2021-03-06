/* eslint-disable react/jsx-one-expression-per-line */
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
import apiUF from '../../services/apiUFs';
import api from '../../services/api';
import convertDate from '../../utils/convertDate';

interface StateInterface {
  sigla: string;
  nome: string;
}

interface ArtigosResponse {
  id: string;
  date: string; /// / Está retornando nulo
  nome_perfil: string;
  username: string;
  title: string;
  description: string;
  subtitle: string;
  avatar: string;
  avatar_user: string; /// Não tem
  uf_user: string; // não tem
  city: string; // não tem
  user_id: string;
}

interface EventosResponse {
  id: string;
  address: string;
  title: string;
  description: string;
  avatar_evento: string;
  data: string; // nã
  nome_perfil: string;
  username: string;
  hora: string;
}
interface UserInterface {
  uf: string;
  id: string;
}

interface FavoritesInterface {
  id: string;
  artigo_id: string;
  user_id: string;
}

const Landig: React.FC = () => {
  const [artigos, setArtigos] = useState<ArtigosResponse[]>([]);
  const [eventos, setEventos] = useState<EventosResponse[]>([]);
  const [favorites, setFavorites] = useState<FavoritesInterface[]>([
    {
      id: ' ',
      artigo_id: ' ',
      user_id: ' ',
    },
  ]);
  const [states, setStates] = useState<StateInterface[]>([
    {
      nome: '',
      sigla: '',
    },
  ]);
  const [uf, setUf] = useState<string>();
  const { user } = useAuth();
  const newUser = user as UserInterface;

  useEffect(() => {
    api.post(`artigo`, {}).then(response => {
      const { data } = response.data;
      console.log(response);
      setArtigos(data);
    });
    api.post(`ListEvento`, {}).then(response => {
      const { data } = response.data;
      setEventos(data);
    });
    console.log(favorites);
    setUf('Todos');
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

  const handleSubmitState = (newUf: string) => {
    api.post(`ListEvento`, { uf: newUf }).then(response => {
      const { data } = response.data;
      setEventos(data);
    });
    api.post(`artigo`, { uf: newUf }).then(response => {
      const { data } = response.data;
      setArtigos(data);
    });
    setUf(newUf === '' ? 'Todos' : newUf);
    setStates([]);
  };
  const handleFavorite = async (idArtigo: string) => {
    await api.post(`/star/${idArtigo}/${newUser.id}`, {});
    const newFavorites = await api.post(`/allstar`, {});
    setFavorites(newFavorites.data);
  };
  return (
    <>
      <header>
        <NavBar page="landing" />
      </header>
      <Container>
        <Title>
          <div className="StatesOptions">
            <HiLocationMarker size={30} color="#009CA0" />
            <p> {uf}</p>
            <button type="submit" onClick={handleStates}>
              {states.length > 1 ? (
                <IoIosArrowDown
                  size={35}
                  color="#009CA0"
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <RiArrowRightSLine
                  size={35}
                  color="#009CA0"
                  style={{ cursor: 'pointer' }}
                />
              )}
            </button>
            {states.length > 1 && (
              <ul>
                <li key="todos">
                  <button
                    type="button"
                    onClick={() => {
                      handleSubmitState('');
                    }}
                  >
                    Todos
                  </button>
                </li>
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
                <ArtigoItem key={`${artigo.id + artigo.title}`}>
                  <InformationArtigo>
                    <HeaderArtigo>
                      <Link to={`/Perfil/${artigo.user_id}`} className="perfil">
                        <img src={artigo.avatar_user} alt="" />
                        <p>
                          <strong>{artigo.username} </strong>
                          <br />
                          <span> {artigo.nome_perfil}</span>
                        </p>
                      </Link>
                      <span>
                        {artigo.date === undefined
                          ? ''
                          : convertDate(artigo.date)}
                      </span>
                    </HeaderArtigo>
                    <Link to={`Artigo/${artigo.id}`}>
                      <h3>{artigo.title}</h3>
                      <p>{artigo.subtitle}</p>
                    </Link>
                  </InformationArtigo>
                  <ImageArtigo>
                    <HeaderArtigo>
                      <span> {`${artigo.uf_user}`}</span>
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
                  <EventoItem key={`${evento.id + evento.title}`}>
                    <span>
                      {`${
                        evento.data === undefined
                          ? ''
                          : convertDate(evento.data)
                      }, ${evento.hora}`}
                    </span>
                    <img src={evento.avatar_evento} alt=" " />
                    <Link to={`Evento/${evento.id}`}>{evento.title}</Link>
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
