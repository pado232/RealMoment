import axios from "axios";
import { getCookie, setCookie } from "../api/Cookies";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("MemberAccess");
    if (token) {
      config.headers.Access = `${token}`;
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
        const oldRefreshToken = getCookie("MemberRefresh");

        const res = await axiosInstance.post(
          "/reissue/accessToken",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Refresh: `${oldRefreshToken}`,
            },
          }
        );

        console.log("재발급 성공", res.data);

        // 새로운 토큰 및 만료 시간 저장

        const AccessToken = res.headers.get("Access");
        const RefreshToken = res.headers.get("Refresh");

        setCookie("MemberAccess", AccessToken);
        setCookie("MemberRefresh", RefreshToken);

        // 원래 요청에 새로운 토큰을 추가하여 재시도
        error.config.headers.Access = `${AccessToken}`;

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
