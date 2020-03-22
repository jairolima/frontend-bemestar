import axios from 'axios';
// producao ajuste link
const api = axios.create({
  baseURL: 'https://www.api.policlinicabemestar.com',
});

export default api;
