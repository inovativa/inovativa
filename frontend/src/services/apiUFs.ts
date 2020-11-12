import axios from 'axios';

const UFs = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
});

export default UFs;
