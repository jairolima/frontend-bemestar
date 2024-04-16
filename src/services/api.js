import axios from 'axios';
// producao ajuste link
const api = axios.create({
  baseURL: 'https://bemestar-legado-nodejs.y2n3tv.easypanel.host/',
  // baseURL: 'http://localhost:3333',
});

export default api;
