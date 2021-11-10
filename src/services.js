import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getCep = (cep) => {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
};
