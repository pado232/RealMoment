import axios from "axios";

const axiosInstanceWithoutAuth = axios.create({
  baseURL: "http://localhost:8080/api",
});

export default axiosInstanceWithoutAuth;
