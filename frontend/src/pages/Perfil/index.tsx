import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GrLinkedin } from 'react-icons/gr';
import { FiLink2 } from 'react-icons/fi';
import {
  Cover,
  Avatar,
  ImgeCover,
  AvatarContainer,
  PagePerfil,
  TitlePerfil,
  City,
  DescriptionPerfil,
  GroupLink,
  ListArtigos,
} from './styles';
import NavBar from '../../components/NavBar';
import api from '../../services/api';

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
  date: Date; /// / Está retornando nulo
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
const Perfil: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [artigos, setArtigos] = useState<ArtigosResponse[]>([]);
  const [perfil, setPerfil] = useState<UserInterface>();
  useEffect(() => {
    api.post(`/list/${id}`, {}).then(response => {
      const { data } = response.data;
      setPerfil(data);
    });
    api.post(`artigo/${id}`, {}).then(response => {
      const { data } = response.data;
      setArtigos(data);
    });
  }, []);
  return (
    <PagePerfil>
      <header>
        <NavBar page="Perfil" />
        <Cover>
          <AvatarContainer>
            <Avatar datatype={perfil?.avatar_front} />
          </AvatarContainer>
          <ImgeCover datatype={perfil?.avatar_back} />
        </Cover>
      </header>
      <main>
        <City>{`${perfil?.city}, ${perfil?.uf}`}</City>
        <TitlePerfil>
          <h3>{perfil?.username}</h3>
          <span>{perfil?.nome_perfil}</span>
        </TitlePerfil>
        <DescriptionPerfil>
          <p>{perfil?.descricao_empresa}</p>
          <p>{perfil?.interesse}</p>
        </DescriptionPerfil>
        <GroupLink>
          <Link to={perfil?.linkedin === undefined ? '' : perfil.linkedin}>
            <GrLinkedin size={25} color="000000" />
            <span>{perfil?.linkedin}</span>
          </Link>
          <Link to={perfil?.site === undefined ? '' : perfil.site}>
            <FiLink2 size={25} color="000000" />
            <span>{perfil?.site}</span>
          </Link>
        </GroupLink>
        {artigos.map(artigo => (
          <ListArtigos key={artigo.title}>
            <img src={artigo.avatar} alt="avatar" />
            <div>
              <h3>{artigo.title}</h3>
              <span>{artigo.subtitle}</span>
            </div>
          </ListArtigos>
        ))}
      </main>
    </PagePerfil>
  );
};

export default Perfil;
