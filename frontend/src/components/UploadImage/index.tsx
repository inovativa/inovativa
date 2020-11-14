import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { SiAddthis } from 'react-icons/si';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErros';
import { Image } from './styles';

interface EventProps {
  title: string;
  subtitle: string;
  description: string;
}
const CreateEvent: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
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
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Image>
          <SiAddthis size={35} color="ffffff" />
        </Image>
      </Form>
    </>
  );
};
export default CreateEvent;
