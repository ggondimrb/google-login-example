import axios from "axios";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Authorization": 'Token ' + localStorage.getItem('token')
};

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers,
});

export default api;
