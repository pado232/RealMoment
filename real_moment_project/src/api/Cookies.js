import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, expires) => {
  cookies.set(name, value, {
    path: "/",
    expires: expires,
    // 같은 도메인을 가지는 사용자는 다시 새로운 아이디로 로그인 하게 해야함
    // 전에 로그인했던 사이트는 자동으로 로그아웃 되어야함.
  });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name) => {
  cookies.remove(name, { path: "/" });
};
