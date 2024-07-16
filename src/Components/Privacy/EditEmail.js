import { useState, useRef, useEffect } from "react";
import EmailInput from "../../util/SignUpInput/EmailInput";
import MyButton from "../../util/Buttons/MyButton";
import WhiteButton from "../../util/Buttons/WhiteButton";

import "../../styles/Privacy.css";
import axiosInstance from "../../api/AxiosInstance";
import { getCookie } from "../../api/Cookies";
import axiosInstanceWithoutAuth from "../../api/AxioxInstanceWithoutAuth";

const EditEmail = ({ onCancel, onConfirm }) => {
  const inputRef = useRef([]);
  const [certificationEnabled, setCertificationEnabled] = useState(false);
  const [emailCodeDiff, setEmailCodeDiff] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [state, setState] = useState({
    email: "",
    code: "",
  });

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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  const handleChangeState = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value.replace(/\s/g, ""),
    }));
  };

  const handleEmailSubmit = () => {
    const emailReg = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
    if (!emailReg.test(state.email)) {
      inputRef.current[0].focus();
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

  const handleEmailCodeSubmit = () => {
    for (let i = 0; i < inputRef.current.length; i++) {
      if (inputRef.current[i].value === "") {
        inputRef.current[i].focus();
        return;
      }
    }
    axiosInstanceWithoutAuth
      .post(`/email/code/check`, {
        email: state.email,
        code: state.code,
      })
      .then((res) => {
        // setCertificationEnabled(false);

        axiosInstance
          .patch(`/member/${getCookie("Id")}/email`, {
            email: state.email,
          })
          .then((res) => {
            setCertificationEnabled(false);
            setEmailCodeDiff("");
            setShowAlert(false);
            window.alert("인증 완료! 이메일이 성공적으로 변경되었습니다.");

            onConfirm();
            console.log("이메일 변경 성공", res);
          })
          .catch((error) => {
            console.log("이메일 변경 실패", error);
          });
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
  return (
    <div className="EditeMail">
      <div>변경할 이메일</div>
      <div className="box">
        <EmailInput
          value={state.email}
          onChange={handleChangeState}
          index={0}
          inputRef={inputRef}
        />
        <WhiteButton
          style={{ marginTop: 9, marginBottom: 10, marginLeft: 20 }}
          buttonText={"인증"}
          onClick={handleEmailSubmit}
        />
      </div>

      {showAlert && (
        <div style={{ color: "black", paddingBottom: 5 }} className="pw_error">
          {alertMessage}
        </div>
      )}
      {certificationEnabled && (
        <div style={{ paddingBottom: 15 }}>
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
      <div className="box">
        <input
          placeholder="인증번호 입력"
          name="code"
          value={state.code}
          ref={(el) => (inputRef.current[1] = el)}
          onChange={handleChangeState}
          disabled={!certificationEnabled}
        />
      </div>
      <div className="error">{emailCodeDiff}</div>
      <div className="button_warpper">
        <MyButton
          style={{ marginLeft: 20 }}
          buttonText={"취소"}
          onClick={onCancel}
        />

        <MyButton buttonText={"완료"} onClick={handleEmailCodeSubmit} />
      </div>
    </div>
  );
};
export default EditEmail;
