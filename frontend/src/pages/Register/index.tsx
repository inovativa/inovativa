import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import {
  PageRegister,
  LogoPageRegister,
  SubtitlePage,
  ContainerForm,
  ProfileType,
  GroupInput,
} from './styles';
import logo from '../../assets/images/logo.svg';
import Button from '../../components/Button';
import { RadioButton } from '../../components/RadioButton';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea/index';
import api from '../../services/api';
import apiUF from '../../services/apiUFs';
import Select from '../../components/Select';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';

interface UserInterface {
  typeProfile: number;
  name: string;
  surname: string;
  city: string;
  uf: string;
  company: string;
  whatsapp: number;
  email: string;
  site: string;
  linkedin: string;
  description: string;
  interest: string;
  password: string;
  confirmPassword: string;
}
interface StateInterface {
  sigla: string;
  nome: string;
}
const Register: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
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

  const history = useHistory();

  const handleSubmit = useCallback(
    async (values: UserInterface) => {
      try {
        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'Necessario pelo menos 6 caracteres'),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Senhas não coincidem, verifique.',
          ),
          name: Yup.string().required('Infome o nome.'),
          city: Yup.string().required('Infome a cidade.'),
          uf: Yup.string().required('Infome o estado.'),
          email: Yup.string().required('Campo e-mail é obrigatório.'),
          company: Yup.string().required(
            'Campo empresa/startup é obrigatório.',
          ),
          typeProfile: Yup.number().required(
            'Informe seu perfil startup, empresa, investidor ou mentor.',
          ),
        });
        await schema.validate(values, {
          abortEarly: false,
        });
        const user = {
          username: values.name,
          email: values.email,
          password: values.password,
          empresa: values.company,
          whatsapp: values.whatsapp,
          site: values.site,
          linkedin: values.linkedin,
          descricao_empresa: values.company,
          city: values.city,
          interesse: values.interest,
          uf: values.uf,
        };
        await api.post(`/create/${values.typeProfile}`, user);
        addToast({
          type: 'success',
          title: 'Cadastrado com sucesso! ',
          description: 'Cadastro realizado',
        });
        // history.push('login');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na Alteração ',
          description: 'Ocorreu um erro ao realizar cadastro.',
        });
      }
    },
    [formRef, history, addToast],
  );
  return (
    <>
      <PageRegister>
        <LogoPageRegister>
          <img src={logo} alt="Logo" />
          <SubtitlePage>cadastre-se</SubtitlePage>
        </LogoPageRegister>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <ContainerForm>
            <ProfileType>
              <RadioButton
                type="radio"
                id="startupProfile"
                name="typeProfile"
                value={1}
              />
              <label htmlFor="startupProfile">startup</label>
              <RadioButton
                type="radio"
                id="empresaProfile"
                name="typeProfile"
                value={2}
              />
              <label htmlFor="empresaProfile">empresa</label>
              <RadioButton
                type="radio"
                id="investidorProfile"
                name="typeProfile"
                value={3}
              />
              <label htmlFor="investidorProfile">investidor</label>
              <RadioButton
                type="radio"
                id="mentorProfile"
                name="typeProfile"
                value={4}
              />
              <label htmlFor="mentorProfile">mentor</label>
            </ProfileType>
            <Input background="#fff6bb" name="name" label="nome" />
            <GroupInput>
              <Input background="#fff6bb" name="city" label="cidade" />
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
            <Input
              background="#fff6bb"
              name="company"
              label="empresa/startup"
            />
            <Input background="#fff6bb" name="whatsapp" label="whatsapp" />
            <Input background="#fff6bb" name="email" label="email" />
            <Input background="#fff6bb" name="site" label="site" />
            <Input background="#fff6bb" name="linkedin" label="linked-in" />
            <TextArea
              background="#fff6bb"
              name="description"
              label="descrição do perfil"
            />
            <TextArea background="#fff6bb" name="interest" label="interesse" />
            <GroupInput>
              <Input
                background="#fff6bb"
                name="password"
                label="senha"
                type="password"
              />
              <Input
                background="#fff6bb"
                name="confirmPassword"
                label="confirmar senha"
                type="password"
              />
            </GroupInput>
            <Button>cadastrar</Button>
          </ContainerForm>
        </Form>
      </PageRegister>
    </>
  );
};

export default Register;
