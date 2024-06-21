import axios from "axios";

const axiosInstanceWithoutAuth = axios.create({
  baseURL: "http://localhost:8080",
});

export default axiosInstanceWithoutAuth;
