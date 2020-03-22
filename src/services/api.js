import axios from 'axios';
// producao
const api = axios.create({
  baseURL: 'https://www.api.policlinicabemestar.com',
});

export default api;
