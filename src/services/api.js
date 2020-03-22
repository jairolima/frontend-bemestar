import axios from 'axios';
// producao ajuste link
const api = axios.create({
  baseURL: 'https://api.policlinicabemestar.com',
});

export default api;
