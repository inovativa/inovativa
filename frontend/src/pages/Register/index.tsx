import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import * as Yup from 'yup';
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
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea/index';
import api from '../../services/api';
import apiUF from '../../services/apiUFs';
import Select from '../../components/Select';

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
  const valuesInitial: UserInterface = {
    city: '',
    company: '',
    interest: '',
    confirmPassword: '',
    description: '',
    email: '',
    linkedin: '',
    name: '',
    password: '',
    site: '',
    surname: '',
    typeProfile: 0,
    uf: '',
    whatsapp: 0,
  };
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
  const [values, setValues] = useState(valuesInitial);
  function setValue(chave: string, value: string) {
    setValues({
      ...values,
      [chave]: value,
    });
  }
  function handleChange(
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>,
  ) {
    const { value, name } = e.target;
    setValue(name, value);
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const schema = Yup.object().shape({
        password: Yup.string().min(6, 'Necessario pelo menos 6 caracteres'),
        confirmPassword: Yup.string().oneOf(
          [Yup.ref('password'), undefined],
          'Senhas não coincidem, verifique.',
        ),
        name: Yup.string().required('Infome o nome.'),
        surname: Yup.string().required('Infome o sobrenome.'),
        city: Yup.string().required('Infome a cidade.'),
        uf: Yup.string().required('Infome o estado.'),
        email: Yup.string().required('Campo e-mail é obrigatório.'),
        company: Yup.string().required('Campo empresa/startup é obrigatório.'),
        interest: Yup.string().required('Campo interesse é obrigatório.'),
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
      const userNew = await api.post(`/create/${values.typeProfile}`, user);
      console.log(userNew.data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <PageRegister>
        <LogoPageRegister>
          <img src={logo} alt="Logo" />
          <SubtitlePage>cadastre-se</SubtitlePage>
        </LogoPageRegister>
        <ContainerForm onSubmit={handleSubmit}>
          <ProfileType>
            <input
              type="radio"
              id="startupProfile"
              name="typeProfile"
              onChange={handleChange}
              value={1}
            />
            <label htmlFor="startupProfile">Startup</label>
            <input
              type="radio"
              id="empresaProfile"
              name="typeProfile"
              onChange={handleChange}
              value={2}
            />
            <label htmlFor="empresaProfile">empresa</label>
            <input
              type="radio"
              id="investidorProfile"
              name="typeProfile"
              onChange={handleChange}
              value={3}
            />
            <label htmlFor="investidorProfile">investidor</label>
            <input
              type="radio"
              id="mentorProfile"
              name="typeProfile"
              onChange={handleChange}
              value={4}
            />
            <label htmlFor="mentorProfile">mentor</label>
          </ProfileType>
          <GroupInput>
            <Input
              name="name"
              label="nome"
              value={values.name}
              onChange={handleChange}
            />
            <Input
              name="surname"
              label="sobrenome"
              value={values.surname}
              onChange={handleChange}
            />
          </GroupInput>
          <GroupInput>
            <Input
              name="city"
              label="cidade"
              value={values.city}
              onChange={handleChange}
            />
            <Select onChange={handleChange} name="UF">
              {states.map(state => {
                return <option value={state.sigla}>{state.nome}</option>;
              })}
            </Select>
          </GroupInput>
          <Input
            name="company"
            label="empresa/startup"
            value={values.company}
            onChange={handleChange}
          />
          <Input
            name="whatsapp"
            label="whatsapp"
            value={values.whatsapp}
            onChange={handleChange}
          />
          <Input
            name="email"
            label="email"
            value={values.email}
            onChange={handleChange}
          />
          <Input
            name="site"
            label="site"
            value={values.site}
            onChange={handleChange}
          />
          <Input
            name="linkedin"
            label="linked-in"
            value={values.linkedin}
            onChange={handleChange}
          />
          <TextArea
            name="description"
            label="descrição do perfil"
            onChange={handleChange}
            value={values.description}
          />
          <TextArea
            name="interest"
            label="interesse"
            value={values.interest}
            onChange={handleChange}
          />
          <GroupInput>
            <Input
              name="password"
              label="senha"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
            <Input
              name="confirmPassword"
              label="confirmar senha"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
            />
          </GroupInput>
          <Button>Cadastrar</Button>
        </ContainerForm>
      </PageRegister>
    </>
  );
};

export default Register;
