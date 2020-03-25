import axios from 'axios';
// producao ajuste link
const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
