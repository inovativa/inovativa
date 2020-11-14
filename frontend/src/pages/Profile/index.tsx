import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import { PageProfile, ContainerForm, GroupInput } from './styles';
import Button from '../../components/Button';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea/index';
import api from '../../services/api';
import apiUF from '../../services/apiUFs';
import Select from '../../components/Select';
import getValidationErros from '../../utils/getValidationErros';
import NavBar from '../../components/NavBar';
import { useAuth } from '../../hooks/AuthContext';
import Avatar from '../../components/Avatar';
import CoverInput from '../../components/Cover/index';
import { useToast } from '../../hooks/toast';

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
  descrição: string;
  interesse: string;
  password: string;
  confirmPassword: string;
  id: string;
  avatar_back?: string;
  avatar_front?: string;
}
interface StateInterface {
  sigla: string;
  nome: string;
}
const Register: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const { password, id, perfil_id } = user as UserInterface;
  user as UserInterface;
  const newUser = user as UserInterface;
  newUser.confirmPassword = password;
  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    formRef.current?.setData(newUser);
  }, [newUser]);
  const formRef = useRef<FormHandles>(null);
  const [states, setStates] = useState<StateInterface[]>([
    {
      nome: '',
      sigla: '',
    },
  ]);
  useEffect(() => {
    apiUF.get('/estados').then(response => {
      setStates(response.data);
    });
  }, []);

  const handleSubmit = useCallback(
    async (values: UserInterface) => {
      try {
        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'Necessario pelo menos 6 caracteres'),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Senhas não coincidem, verifique.',
          ),
          username: Yup.string().required('Infome o nome.'),
          city: Yup.string().required('Infome a cidade.'),
          uf: Yup.string().required('Infome o estado.'),
          email: Yup.string().required('Campo e-mail é obrigatório.'),
          empresa: Yup.string().required(
            'Campo empresa/startup é obrigatório.',
          ),
          interesse: Yup.string().required('Campo interesse é obrigatório.'),
          perfil_id: Yup.number().required(
            'Informe seu perfil startup, empresa, investidor ou mentor.',
          ),
        });
        /* await schema.validate(values, {
          abortEarly: false,
        }); */
        await api.post(`/update/${perfil_id}/${id}`, values);
        refreshUser(id);
        addToast({
          type: 'success',
          title: 'Usuário alterado com sucesso',
          description: 'Usuário alterado.',
        });
        history.push('/landing');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na alteraçao',
          description: 'Ocorreu um erro ao alteração.',
        });
      }
    },
    [
      formRef,
      id,
      perfil_id,
      refreshUser,
      addToast,
      getValidationErros,
      history,
    ],
  );
  return (
    <>
      <PageProfile>
        <NavBar page="profile" />
        <CoverInput>
          <Avatar
            image={
              newUser.avatar_front === undefined ? '' : newUser.avatar_front
            }
            route={`/filesFront/${newUser.id}`}
            user={{ id, avatar_front: newUser.avatar_front }}
          />
        </CoverInput>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <ContainerForm>
            <Input name="username" label="nome" />
            <GroupInput>
              <Input name="city" label="cidade" />
              <Select name="uf">
                {states.map(state => {
                  return (
                    <option key={state.sigla} value={state.sigla}>
                      {state.nome.toLowerCase()}
                    </option>
                  );
                })}
              </Select>
            </GroupInput>
            <Input name="empresa" label="empresa/startup" />
            <Input name="whatsapp" label="whatsapp" />
            <Input name="email" label="email" />
            <Input name="site" label="site" />
            <Input name="linkedin" label="linked-in" />
            <TextArea name="descricao_empresa" label="descrição do perfil" />
            <TextArea name="interesse" label="interesse" />
            <GroupInput>
              <Input name="password" label="senha" type="password" />
              <Input
                name="confirmPassword"
                label="confirmar senha"
                type="password"
              />
            </GroupInput>
            <Button>Alterar</Button>
          </ContainerForm>
        </Form>
      </PageProfile>
    </>
  );
};

export default Register;
