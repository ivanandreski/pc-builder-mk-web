import axios from "axios";

const REACT_APP_API_URL = "http://localhost:8080/api";

const instance = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    // "Access-Control-Allow-Origin": "*",
  },
});

export default instance;
