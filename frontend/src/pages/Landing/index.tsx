import React, { useCallback, useState } from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { RiArrowRightSLine } from 'react-icons/ri';
import { IoIosArrowDown } from 'react-icons/io';
import { FaRegUserCircle } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
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

interface StateInterface {
  sigla: string;
  nome: string;
}
const Landig: React.FC = () => {
  const [perfil, setPerfil] = useState('');
  const [states, setStates] = useState<StateInterface[]>([
    {
      nome: '',
      sigla: '',
    },
  ]);

  const handleStates = useCallback(() => {
    apiUF.get('/estados').then(response => {
      setStates(response.data);
    });
  }, [setStates]);

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
                    <li>
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
            <FaRegUserCircle
              size={30}
              color="#009CA0"
              style={{ cursor: 'pointer' }}
            />
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
                  <button type="submit" onClick={handleFavorite}>
                    <AiFillStar size={25} color="#C4C4C4" />
                  </button>
                </HeaderArtigo>
                <img src="" alt="" />
              </ImageArtigo>
            </ArtigoItem>
          </Artigos>
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
export default Landig;
