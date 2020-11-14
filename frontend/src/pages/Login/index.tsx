import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import LogoContainer from '../../components/LogoContainer';
import { PageLogin, FormLogin } from './styles';
import { Input } from '../../components/Input/index';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';

interface SignInFormData {
  password: string;
  email: string;
}

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'Necessario pelo menos 6 caracteres'),
          email: Yup.string()
            .required('Email obrigatório.')
            .email('Digite e-mail válido'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          email: data.email,
          password: data.password,
        });
        history.push('/landing');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, formRef, history, addToast],
  );
  return (
    <>
      <PageLogin>
        <LogoContainer />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormLogin>
            <Input background="#fff6bb" name="email" label="email" />
            <Input
              background="#fff6bb"
              name="password"
              label="senha"
              type="password"
            />
            <Button>entrar</Button>
          </FormLogin>
        </Form>
      </PageLogin>
    </>
  );
};

export default Login;
