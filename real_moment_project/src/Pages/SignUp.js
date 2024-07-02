import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";

import MyButton from "../util/Buttons/MyButton";
import PhoneInput from "../util/SignUpInput/PhoneInput";
import BirthDateInput from "../util/SignUpInput/BirthDateInput";
import PasswordInput from "../util/SignUpInput/PasswordInput";
import EmailInput from "../util/SignUpInput/EmailInput";
import { useNavigate } from "react-router-dom";

import "../styles/SignUp.css";
import WhiteButton from "../util/Buttons/WhiteButton";
import axiosInstanceWithoutAuth from "../api/AxioxInstanceWithoutAuth";
import usePageTitle from "../hooks/usePageTitle";

export const sortOptionList = [
  { value: "010" },
  { value: "011" },
  { value: "016" },
  { value: "017" },
  { value: "018" },
  { value: "019" },
];

const SignUp = () => {
  usePageTitle(`회원가입`);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const [infoCollect, setInfoCollect] = useState(false);
  const [certificationEnabled, setCertificationEnabled] = useState(false);
  const [idValid, setIdValid] = useState(false);
  const [doubleCheck, setDoubleCheck] = useState(false);
  const [idCheckMessage, setIdCheckMessage] = useState("");
  const [emailCodeDiff, setEmailCodeDiff] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const [state, setState] = useState({
    id: "",
    pw: "",
    pwcheck: "",
    email: "",
    code: "",
    name: "",
    phone1: "010",
    phone2: "",
    phone3: "",
    gender: "",
    year: "",
    month: "",
    day: "",
  });

  const handleChangeState = (e) => {
    const { name, value, type } = e.target;
    if (name === "id") {
      setIdValid(validateId(value));
    }

    if ((name === "phone2" || name === "phone3") && isNaN(value)) {
      // 입력값이 숫자가 아닌 경우 무시
      return;
    }

    if (type === "radio" && name === "gender") {
      // 라디오 입력을 별도로 처리
      setState({
        ...state,
        gender: value,
      });
    } else {
      // 다른 입력 유형을 처리
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const idDoubleCheck = (event) => {
    event.preventDefault();
    axiosInstanceWithoutAuth
      .post(`/memberIdCheck`, {
        loginId: state.id,
      })
      .then((res) => {
        const loginCheckBoolean = res.data;

        if (loginCheckBoolean === true) {
          setIdCheckMessage("중복없음");
          setDoubleCheck(!doubleCheck);
        } else {
          setIdCheckMessage("중복");
        }

        console.log("중복 확인 성공", res);
      })
      .catch((error) => {
        console.log("중복 확인 실패", error);
      });
  };

  const handleChangeInfoCollect = () => {
    setInfoCollect(!infoCollect);
  };

  const validateId = (value) => {
    const idReg = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{5,20}$/;
    return idReg.test(value);
  };

  const ReWrite = (event) => {
    event.preventDefault();
    setDoubleCheck(!doubleCheck);
    setIdCheckMessage("");
  };

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  const startTimer = (duration) => {
    setTimeLeft(duration);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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

    // 비밀번호 확인 유효성 검사
    if (state.pw !== state.pwcheck) {
      inputRef.current[2].focus();
      return;
    }

    // 이메일 유효성 검사
    const emailReg = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
    if (!emailReg.test(state.email)) {
      inputRef.current[3].focus();
      return; // 이메일 형식이 유효하지 않으면 전송을 막음
    }

    // 성별 유효성 검사
    if (state.gender === "") {
      inputRef.current[7].focus();
      alert("성별을 선택해주세요.");
      return;
    }

    // 생년월일 유효성 검사
    if (state.year === "" || state.month === "" || state.day === "") {
      alert("생년월일을 선택해주세요.");
      return;
    }

    // 정보수집 유효성 검사
    if (infoCollect === false) {
      alert("정보수집에 대해 동의해주세요.");
      return;
    }

    if (doubleCheck === false) {
      alert("아이디 중복 확인해주세요.");
      return;
    }

    console.log(state);

    // 통신
    axiosInstanceWithoutAuth
      .post(`/join`, {
        loginId: state.id,
        loginPassword: state.pw,
        email: state.email,
        name: state.name,
        tel: `${state.phone1}-${state.phone2}-${state.phone3}`,
        birthDate: `${state.year}-${state.month}-${state.day}`,
        gender: state.gender,
      })
      .then((res) => {
        window.alert("정상적으로 가입되었습니다.");
        setState({
          id: "",
          pw: "",
          pwcheck: "",
          email: "",
          code: "",
          name: "",
          phone1: "010",
          phone2: "",
          phone3: "",
          gender: "",
          year: "",
          month: "",
          day: "",
        });
        setInfoCollect(false);
        setDoubleCheck(false);

        navigate("/login", { state: { from: "/signup" } });
        console.log("회원가입 저장 성공", res);
      })
      .catch((error) => {
        console.log("회원가입 저장 실패", error);
      });
  };

  const handleEmailSubmit = (event) => {
    event.preventDefault();

    const emailReg = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
    if (!emailReg.test(state.email)) {
      inputRef.current[4].focus();
      return;
    }

    setAlertMessage("이메일을 전송 중입니다. 잠시만 기다려주세요.");
    setShowAlert(true);

    axiosInstanceWithoutAuth
      .post(`/email/html`, {
        email: state.email,
      })
      .then((res) => {
        setCertificationEnabled(true);
        setAlertMessage(
          "해당 이메일로 인증 코드를 전송했습니다. 인증 코드를 기입해주세요."
        );

        // ----------- 남은 시간 넣기 -------------
        // 타이머 시작 (5분 = 300초)
        startTimer(300);

        console.log("이메일 인증 코드 보내기 성공", res);
      })
      .catch((error) => {
        console.log("이메일 인증 코드 보내기실패", error);
      });
  };

  const handleEmailCodeSubmit = (event) => {
    // 인증 완료했으면 유효성 검사 추가하기

    event.preventDefault();

    axiosInstanceWithoutAuth
      .post(`/email/code/check`, {
        email: state.email,
        code: state.code,
      })
      .then((res) => {
        setCertificationEnabled(false);
        setEmailCodeDiff("");
        setShowAlert(false);
        window.alert("인증이 완료되었습니다.");
        console.log("이메일 인증 성공", res);
      })
      .catch((error) => {
        if (error.response.data === "BAD") {
          setEmailCodeDiff("잘못된 인증 코드입니다.");
        } else if (error.response.data === "TIME_OUT_or_BAD_EMAIL") {
          setEmailCodeDiff("인증코드 기간이 만료되었습니다.");
        }
        console.log("이메일 인증 실패", error);
      });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  return (
    <div className="SignUp">
      <div className="signup_content">
        <form>
          <div className="signup_title">아이디</div>
          <input
            className="input"
            name="id"
            value={state.id}
            onChange={handleChangeState}
            ref={(el) => (inputRef.current[0] = el)}
            autoComplete="id"
            readOnly={doubleCheck}
          />
          {!idValid && state.id.length > 0 && (
            <div className="pw_error">
              숫자를 포함하여 5글자 이상 작성해주세요. (한글, 특수문자 제외)
            </div>
          )}
          {idCheckMessage && (
            <div>
              {idCheckMessage === "중복없음" ? (
                <div>
                  <div className="pw_error" style={{ color: "black" }}>
                    사용 가능한 아이디입니다.
                  </div>
                  <div>
                    <WhiteButton
                      buttonText={"다시 작성하기"}
                      onClick={ReWrite}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="pw_error">
                    이미 존재하는 아이디입니다. 다시 작성해주세요.
                  </div>
                </div>
              )}
            </div>
          )}
          {idCheckMessage === "중복없음" ? (
            <div></div>
          ) : (
            <div>
              <div>
                <button className="greenbutton" onClick={idDoubleCheck}>
                  중복 확인
                </button>
              </div>
            </div>
          )}
          <PasswordInput
            labelText={"비밀번호"}
            name={"pw"}
            value={state.pw}
            onChange={handleChangeState}
            index={1}
            inputRef={inputRef}
            autoComplete={"password"}
          />
          <div className="signup_title">비밀번호 확인</div>
          <input
            className="input"
            name="pwcheck"
            value={state.pwcheck}
            type="password"
            maxLength="20"
            onChange={handleChangeState}
            ref={(el) => (inputRef.current[2] = el)}
            autoComplete="check-password"
          />
          {state.pwcheck.length > 0 && state.pw !== state.pwcheck && (
            <div className="pw_error">비밀번호가 일치하지 않습니다.</div>
          )}
          <EmailInput
            labelText={"이메일"}
            value={state.email}
            onChange={handleChangeState}
            index={3}
            inputRef={inputRef}
            autoComplete={"email"}
          />

          {showAlert && (
            <div style={{ color: "black" }} className="pw_error">
              {alertMessage}
            </div>
          )}
          {certificationEnabled && (
            <div>
              {timeLeft > 0 ? (
                <div style={{ color: "black" }} className="pw_error">
                  남은 시간: {formatTime(timeLeft)}
                </div>
              ) : (
                <div className="pw_error">
                  시간이 만료되었습니다. 다시 시도해주세요.
                </div>
              )}
            </div>
          )}
          <WhiteButton
            style={{ marginBottom: 20 }}
            buttonText={"인증"}
            onClick={handleEmailSubmit}
          />
          <div className="box">
            <input
              className="input"
              placeholder="인증번호 입력"
              name="code"
              value={state.code}
              ref={(el) => (inputRef.current[4] = el)}
              onChange={handleChangeState}
              disabled={!certificationEnabled}
            />
          </div>
          {emailCodeDiff && <div className="pw_error">{emailCodeDiff}</div>}

          <button className="greenbutton" onClick={handleEmailCodeSubmit}>
            인증 확인
          </button>

          <div className="signup_title">이름</div>
          <input
            className="input"
            name="name"
            value={state.name}
            onChange={handleChangeState}
            ref={(el) => (inputRef.current[5] = el)}
            autoComplete="username"
          />
          <PhoneInput
            state={state}
            handleChangeState={handleChangeState}
            inputRef={inputRef}
            indexOne={6}
            indexTwo={7}
            autoCompletePhoneOne={"phone-one"}
            autoCompletePhoneTwo={"phone-two"}
          />
          <div className="signup_title">성별</div>
          <label htmlFor="male">
            <input
              className="radio"
              type="radio"
              name="gender"
              id="male"
              value="남"
              ref={(el) => (inputRef.current[8] = el)}
              onChange={handleChangeState}
            />
            <span>남자</span>
          </label>
          <label htmlFor="female">
            <input
              className="radio"
              type="radio"
              name="gender"
              id="female"
              value="여"
              ref={(el) => (inputRef.current[9] = el)}
              onChange={handleChangeState}
            />
            <span>여자</span>
          </label>
          <BirthDateInput state={state} handleChangeState={handleChangeState} />
          <div className="signup_title">
            <label>
              <input
                className="checkbox"
                type="checkbox"
                name="info_collect"
                value={infoCollect}
                onChange={handleChangeInfoCollect}
              />
              <span style={{ fontWeight: "lighter" }}>
                Real Moment의 정보수집에 동의하시겠습니까?
              </span>
            </label>
          </div>
          <MyButton
            buttonText={"회원 가입하기"}
            onClick={handleSubmit}
            icon={FaCheck}
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
