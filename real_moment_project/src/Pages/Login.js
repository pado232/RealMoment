import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { setCookie } from "../api/Cookies";
import MyButton from "../util/Buttons/MyButton";
import axiosInstance from "../api/AxiosInstance";
import { HiOutlineLockClosed } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import "../styles/Login.css";
import usePageTitle from "../hooks/usePageTitle";

const Login = ({ onLogin }) => {
  usePageTitle(`LOGIN`);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef([]);
  const [state, setState] = useState({
    id: "",
    pw: "",
  });
  const [pwValid, setPwValid] = useState(false);
  const [fromPath, setFromPath] = useState("");

  const iconSize = 9 * 2;
  const pwIconSize = 7 * 3;

  useEffect(() => {
    // 로그인 페이지로 이동하기 전의 경로를 추적하여 저장
    if (location.state && location.state.from) {
      setFromPath(location.state.from);
      console.log("location.state.from", location.state.from);
    }
  }, [location]);

  const handleChangeState = (e) => {
    const { name, value } = e.target;
    if (name === "pw") {
      setPwValid(validatePassword(value));
    }
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

    const idReg = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{5,20}$/;
    if (!idReg.test(state.id)) {
      inputRef.current[0].focus();
      return;
    }

    const pwReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    if (!pwReg.test(state.pw)) {
      inputRef.current[1].focus();
      return;
    }

    axiosInstance
      .post("/login", {
        loginId: state.id,
        loginPassword: state.pw,
      })
      .then((response) => {
        const memberId = response.data.memberId;
        const AccessToken = response.headers.get("Access");
        const RefreshToken = response.headers.get("Refresh");

        setCookie("Id", memberId);
        setCookie("MemberAccess", AccessToken);
        setCookie("MemberRefresh", RefreshToken);

        onLogin(AccessToken, RefreshToken);

        // 특정 경로에서 로그인 페이지로 이동했는지 확인
        if (fromPath === "/signup") {
          navigate("/");
        } else {
          navigate(-1);
        }

        console.log("로그인 서버 전송: ", response);
      })
      .catch((error) => {
        console.error("로그인 에러:", error);
        alert("유효하지 않은 회원정보입니다. 다시 입력해주세요.");
      })
      .finally(() => {
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
