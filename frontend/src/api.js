import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// Cria uma instância do axios com a URL base do backend para realizar as requisições HTTP
const api = axios.create({
  baseURL: "http://3.145.66.167:8000/",
});

// Adiciona o token de acesso à requisições, caso ele exista no armazenamento local do navegador
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN); // Obtém o token de acesso do armazenamento local do navegador
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Caso o token de acesso exista, adiciona ele ao cabeçalho da requisição
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
