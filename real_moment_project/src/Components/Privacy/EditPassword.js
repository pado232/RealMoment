import { useRef, useState } from "react";
import PasswordInput from "../../util/SignUpInput/PasswordInput";
import MyButton from "../../util/Buttons/MyButton";

import "../../styles/Privacy.css";
import axiosInstance from "../../api/AxiosInstance";
import { getCookie } from "../../api/Cookies";

const EditPassword = ({ onCancel, onConfirm }) => {
  const inputRef = useRef([]);

  const [state, setState] = useState({
    pw: "",
    new_pw: "",
    new_pwcheck: "",
  });

  const handleChangeState = (e) => {
    const { name, value } = e.target;

    // 다른 입력 유형을 처리
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    for (let i = 0; i < inputRef.current.length; i++) {
      if (inputRef.current[i].value === "") {
        inputRef.current[i].focus();
        return;
      }
    }
    // 비밀번호 확인 유효성 검사
    if (state.new_pw !== state.new_pwcheck) {
      inputRef.current[2].focus();
      return;
    }

    onConfirm();
    console.log(state);

    axiosInstance
      .patch(`/member/${getCookie("Id")}/password`, {
        loginPassword: state.pw,
        newLoginPassword: state.new_pw,
      })
      .then((res) => {
        console.log("fetchEditPassword PATCH ", res);
      })
      .catch((error) => {
        console.error("fetchEditPassword PATCH Error:", error);
      });
  };

  return (
    <div className="EditPassword">
      {/* <h4>비밀번호 변경하기</h4> */}
      <div className="editPassword_content" style={{ width: 250 }}>
        <form>
          <PasswordInput
            labelText={"현재 비밀번호"}
            name={"pw"}
            value={state.pw}
            inputRef={inputRef}
            index={0}
            onChange={handleChangeState}
            autoComplete={"password"}
          />
          <PasswordInput
            labelText={"변경 비밀번호"}
            name={"new_pw"}
            value={state.new_pw}
            inputRef={inputRef}
            index={1}
            onChange={handleChangeState}
            autoComplete={"new-password"}
          />
          <div className="signup_title">변경 비밀번호 확인</div>
          <input
            className="input"
            name="new_pwcheck"
            value={state.pwcheck}
            type="password"
            maxLength="20"
            onChange={handleChangeState}
            ref={(el) => (inputRef.current[2] = el)}
            autoComplete="password-check"
          />

          {state.new_pwcheck.length > 0 &&
            state.new_pw !== state.new_pwcheck && (
              <div className="pw_error">비밀번호가 일치하지 않습니다.</div>
            )}
        </form>
      </div>

      <div className="button_warpper">
        <MyButton
          style={{ marginLeft: 20 }}
          buttonText={"취소"}
          onClick={onCancel}
        />
        <MyButton buttonText={"완료"} onClick={handleSubmit} />
      </div>
    </div>
  );
};
export default EditPassword;
