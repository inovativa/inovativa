import React, { ChangeEvent, useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { SiAddthis } from 'react-icons/si';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import NavBar from '../../components/NavBar';
import { Container, Title, ContainerFluid, Image } from './styles';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErros';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface EventProps {
  title: string;
  subtitle: string;
  description: string;
  file: File;
}

interface UserInterface {
  id: string;
}
const CreateEvent: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();
  const newUser = user as UserInterface;
  const { addToast } = useToast();
  const event = new FormData();

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      event.append('file', e.target.files[0]);
    }
  };
  const handleSubmit = useCallback(
    async (data: EventProps) => {
      try {
        const schema = Yup.object().shape({
          subtitle: Yup.string().required('Descreva o subtitulo.'),
          title: Yup.string().required('Titulo inválido, verifique.'),
          description: Yup.string().required('Descrição inválida, verifique.'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        event.append('title', data.title);
        event.append('subtitle', data.subtitle);
        event.append('description', data.description);
        await api.post(`/createArtigo/${newUser.id}`, event);
        addToast({
          type: 'success',
          title: 'Evento criado com sucesso',
          description: 'Evento criado com sucesso.',
        });
      } catch (err) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    },
    [formRef, newUser, addToast, api],
  );
  return (
    <>
      <NavBar page="createArtigo" />
      <ContainerFluid>
        <Container>
          <Title>
            <h1>criar artigo</h1>
          </Title>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Image>
              <SiAddthis size={35} color="ffffff" />
              <input type="file" name="file" onChange={handleChangeImage} />
            </Image>
            <Input name="title" label="titulo" />
            <Input name="subtitle" label="subtitulo" />
            <TextArea name="description" label="conte mais sobre..." />
            <Button> Criar </Button>
          </Form>
        </Container>
      </ContainerFluid>
    </>
  );
};
export default CreateEvent;
