import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.api.policlinicabemestar.com',
});

export default api;
