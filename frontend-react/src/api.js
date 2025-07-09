// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8082/api", // ⬅️ suppression de /api
  headers: {
    "Content-Type": "application/json",
  },
});


export default API;
