import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
});

// Adiciona o token JWT do usuário em todas as requisições se ele existir
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@TechStore:token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
