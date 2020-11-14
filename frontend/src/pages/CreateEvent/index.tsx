import React, { useCallback, useRef } from 'react';
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

interface EventProps {
  hour: string;
  address: string;
  title: string;
  description: string;
  date: Date;
}
const CreateEvent: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(
    async (data: EventProps) => {
      try {
        const schema = Yup.object().shape({
          day: Yup.string().min(1).max(31).required('Dia inválido, verifique.'),
          month: Yup.string()
            .min(1)
            .max(12)
            .required('Mês inválido, verifique.'),
          hour: Yup.number()
            .min(1)
            .max(23)
            .required('Hora inválida, verifique.'),
          minutes: Yup.number()
            .min(1)
            .max(59)
            .required('Minutos inválido, verifique.'),
          year: Yup.number().required('Ano inválido, verifique.'),
          address: Yup.string().required('Endereço inválido, verifique.'),
          title: Yup.string().required('Titulo inválido, verifique.'),
          description: Yup.string().required('Descrição inválida, verifique.'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        /// chamada api
      } catch (err) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    },
    [formRef],
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
