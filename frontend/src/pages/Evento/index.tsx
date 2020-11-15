import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import api from '../../services/api';
import convertDate from '../../utils/convertDate';
import { PageEvento, EventoDados, Description } from './styles';

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
  avatar_front: string;
  site: string;
}
interface RouteParams {
  id: string;
}
const Evento: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [evento, setEvento] = useState<EventosResponse>();
  useEffect(() => {
    api.post(`/oneEvento/${id}`, {}).then(response => {
      const { data } = response.data;
      setEvento(data);
    });
    console.log(evento);
  }, []);
  return (
    <PageEvento>
      <header>
        <NavBar page="artigo" />
      </header>
      <main>
        <header>
          <div>
            <img src={evento?.avatar_front} alt="Imagem" />
            <p>{evento?.username}</p>
            <p>{evento?.nome_perfil}</p>
          </div>
        </header>
        <body>
          <EventoDados>
            <img src={evento?.avatar_evento} alt="Imagem" />
            <div>
              <span>
                {`${
                  evento?.data === undefined ? '' : convertDate(evento.data)
                }, ${evento?.hora}`}
              </span>
              <Link to={evento?.site === undefined ? '' : evento.site}>
                {evento?.site}
              </Link>
              <h1>{evento?.title}</h1>
            </div>
          </EventoDados>
          <Description>{evento?.description}</Description>
        </body>
      </main>
    </PageEvento>
  );
};

export default Evento;
