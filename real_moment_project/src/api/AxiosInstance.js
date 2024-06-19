import axios from "axios";
import { getCookie, setCookie } from "../api/Cookies";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("Authorization1");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      response: { status },
    } = error;

    if (status === 403) {
      //&& data.message === "TIME_OUT_REFRESH_TOKEN"
      try {
        // 재발급 요청을 보내기 전에 이전 토큰과 리프레시 토큰을 가져옴
        // const oldAuthorization = getCookie("Authorization");
        const oldRefreshToken = getCookie("Refresh_Token1");

        const res = await axiosInstance.post(
          "/reissue/accessToken",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              // Authorization: `${oldAuthorization}`,
              Refresh_Token: `${oldRefreshToken}`,
            },
          }
        );

        console.log("재발급 성공", res.data);

        // 새로운 토큰 및 만료 시간 저장

        const AuthorizationToken = res.headers.get("Authorization");
        const RefreshToken = res.headers.get("Refresh_Token");

        setCookie("Authorization1", AuthorizationToken);
        setCookie("Refresh_Token1", RefreshToken);

        error.config.headers.Authorization = `${AuthorizationToken}`;
        return axiosInstance(error.config);
      } catch (error) {
        console.error("재발급 실패", error);
        throw new Error("토큰 갱신 실패");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
