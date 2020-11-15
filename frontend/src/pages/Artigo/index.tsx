import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import api from '../../services/api';
import convertDate from '../../utils/convertDate';
import { PageArtigo, ArtigoDados, Description } from './styles';

interface UserInterface {
  perfil_id: number;
  username: string;
  surname: string;
  city: string;
  uf: string;
  empresa: string;
  whatsapp: number;
  email: string;
  site: string;
  linkedin: string;
  descricao_empresa: string;
  interesse: string;
  nome_perfil: string;
  id: string;
  avatar_back?: string;
  avatar_front?: string;
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
}
interface RouteParams {
  id: string;
}
const Artigo: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [artigo, setArtigo] = useState<ArtigosResponse>();
  useEffect(() => {
    api.post(`/OneArtigo/${id}`, {}).then(response => {
      const { data } = response.data;
      setArtigo(data);
    });
  }, []);
  return (
    <PageArtigo>
      <header>
        <NavBar page="artigo" />
      </header>
      <main>
        <header>
          <div>
            <img src={artigo?.avatar_user} alt="Imagem" />
            <p>{artigo?.city}</p>
            <p>{artigo?.city}</p>
          </div>
          <span>
            {artigo?.date === undefined ? '' : convertDate(artigo.date)}
            {`${artigo?.city}, ${artigo?.uf_user}`}
          </span>
        </header>
        <body>
          <ArtigoDados>
            <img src={artigo?.avatar} alt="Imagem" />
            <div>
              <h1>{artigo?.title}</h1>
              <h3>{artigo?.subtitle}</h3>
            </div>
          </ArtigoDados>
          <Description>{artigo?.description}</Description>
        </body>
      </main>
    </PageArtigo>
  );
};

export default Artigo;
