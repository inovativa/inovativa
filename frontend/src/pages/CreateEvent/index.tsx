import React, { ChangeEvent, useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { SiAddthis } from 'react-icons/si';
import NavBar from '../../components/NavBar';
import {
  Container,
  Title,
  ContainerFluid,
  Image,
  GroupHorario,
} from './styles';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErros';
import api from '../../services/api';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/toast';

interface EventProps {
  hour: string;
  address: string;
  title: string;
  description: string;
  date: Date;
  file: File;
}

interface UserInterface {
  id: string;
}
const CreateEvent: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();
  const { addToast } = useToast();
  const newUser = user as UserInterface;
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
          date: Yup.date().required('Data invalida, verifique.'),
          hour: Yup.string().min(5).required('Hora inválida, verifique.'),
          address: Yup.string().required('Endereço inválido, verifique.'),
          title: Yup.string().required('Titulo inválido, verifique.'),
          description: Yup.string().required('Descrição inválida, verifique.'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        event.append('address', data.address);
        event.append('title', data.title);
        event.append('description', data.description);
        event.append('date', String(data.date));
        event.append('hora', data.hour);
        await api.post(`evento/${newUser.id}`, event);
        addToast({
          type: 'success',
          title: 'Evento criado com sucesso',
          description: 'Evento criado com sucesso.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na criação de Evento',
          description: 'Ocorreu um erro na criação do evento.',
        });
      }
    },
    [formRef, newUser, addToast, getValidationErrors, event],
  );
  return (
    <>
      <NavBar page="createEvent" />
      <ContainerFluid>
        <Container>
          <Title>
            <h1>criar evento</h1>
          </Title>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Image>
              <SiAddthis size={35} color="ffffff" />
              <input type="file" name="file" onChange={handleChangeImage} />
            </Image>
            <GroupHorario>
              <Input label="Data" name="date" type="date" />
              <Input label="Hora" name="hour" type="time" />
            </GroupHorario>
            <Input name="address" label="endereço (físico ou virtual)" />
            <Input name="title" label="titulo" />
            <TextArea name="description" label="descrição" />
            <Button> Cadastrar</Button>
          </Form>
        </Container>
      </ContainerFluid>
    </>
  );
};
export default CreateEvent;
