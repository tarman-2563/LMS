import axios from 'axios';
const baseURL = 'https://lms-11z1.onrender.com/api';

const API = axios.create({ baseURL });

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if(token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;