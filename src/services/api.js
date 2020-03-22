import axios from 'axios';
// producao
const api = axios.create({
  baseURL: 'https://www.policlinicabemestar.com',
});

export default api;
