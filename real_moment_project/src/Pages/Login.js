import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../api/Cookies";

// import IdBox from "../util/IdBox";
import MyButton from "../util/Buttons/MyButton";
import axiosInstance from "../api/AxiosInstance";

import { HiOutlineLockClosed } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";

import "../styles/Login.css";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const [state, setState] = useState({
    id: "",
    pw: "",
  });
  const [pwValid, setPwValid] = useState(false);

  const iconSize = 9 * 2;
  const pwIconSize = 7 * 3;

  const handleChangeState = (e) => {
    const { name, value } = e.target;
    if (name === "pw") {
      setPwValid(validatePassword(value));
    }
    // 다른 입력 유형을 처리
    setState({
      ...state,
      [name]: value,
    });
  };

  const validatePassword = (value) => {
    const pwReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    return pwReg.test(value);
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    for (let i = 0; i < inputRef.current.length; i++) {
      if (inputRef.current[i].value === "") {
        inputRef.current[i].focus();
        return;
      }
    }
    // 아이디 유효성 검사
    const idReg = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{5,20}$/;
    if (!idReg.test(state.id)) {
      inputRef.current[0].focus();
      return;
    }

    // 비밀번호 유효성 검사
    const pwReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    if (!pwReg.test(state.pw)) {
      inputRef.current[1].focus();
      return;
    }

    axiosInstance
      .post("/login", {
        // axiosInstance 사용
        loginId: state.id,
        loginPassword: state.pw,
      })
      .then((response) => {
        const memberId = response.data.memberId;
        const AuthorizationToken = response.headers.get("Authorization");
        const RefreshToken = response.headers.get("Refresh_Token");

        // 토큰을 쿠키에 저장
        setCookie("Id", memberId);
        setCookie("Authorization", AuthorizationToken);
        setCookie("Refresh_Token", RefreshToken);

        // 로그인 성공 시 부모 컴포넌트로 토큰 전달
        onLogin(AuthorizationToken, RefreshToken);

        // 로그인 성공 알림
        navigate(-1);

        console.log("로그인 서버 전송: ", response);
      })
      .catch((error) => {
        console.error("로그인 에러:", error);
        alert("유효하지 않은 회원정보입니다. 다시 입력해주세요.");
      })
      .finally(() => {
        // 로그인이 성공하든 실패하든 항상 호출되도록 합니다.

        // 로그인 상태 초기화
        setState({
          id: "",
          pw: "",
        });
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className="Login">
      <form>
        <div className="login_content">
          <div className="login_box">
            <FaRegUser size={iconSize} />
            <input
              className="pw_input"
              type="text"
              placeholder="아이디"
              maxLength="20"
              name="id"
              value={state.id}
              onChange={handleChangeState}
              autoComplete="current-password"
              onKeyPress={handleKeyPress}
              ref={(el) => (inputRef.current[0] = el)}
            />
          </div>

          <div className="login_box">
            <HiOutlineLockClosed size={pwIconSize} />
            <input
              className="pw_input"
              type="password"
              placeholder="비밀번호"
              maxLength="20"
              name="pw"
              value={state.pw}
              onChange={handleChangeState}
              autoComplete="current-password"
              onKeyPress={handleKeyPress}
              ref={(el) => (inputRef.current[1] = el)}
            />
          </div>
          {!pwValid && state.pw.length > 0 && (
            <div className="pw_error" style={{ padding: 5 }}>
              영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
            </div>
          )}

          <MyButton buttonText={"로그인"} onClick={handleSubmit} />

          <div className="login_search">
            <a className="login_search_id" href={"/findid"}>
              아이디 찾기
            </a>
            <span>|</span>
            <a className="login_search_pw" href={"/findpw"}>
              비밀번호 찾기
            </a>
            <span>|</span>
            <a className="login_search_sign_up" href={"/signup"}>
              회원가입
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
