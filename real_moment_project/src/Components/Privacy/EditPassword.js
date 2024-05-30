import { useRef, useState } from "react";
import PasswordInput from "../../util/SignUpInput/PasswordInput";
import MyButton from "../../util/Buttons/MyButton";

import "../../styles/Privacy.css";

const EditPassword = ({ onCancel, onConfirm }) => {
  const inputRef = useRef([]);

  const [state, setState] = useState({
    present_pw: "",
    new_pw: "",
    new_pwcheck: "",
  });
  const handleChangeState = (e) => {
    const { name, value } = e.target;
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
    window.confirm("비밀번호를 정말 변경하시겠습니까?");
    onConfirm();
    console.log(state);
  };

  return (
    <div className="EditPassword">
      {/* <h4>비밀번호 변경하기</h4> */}
      <div className="editPassword_content" style={{ width: 250 }}>
        <PasswordInput
          labelText={"현재 비밀번호"}
          name={"present_pw"}
          value={state.present_pw}
          inputRef={inputRef}
          index={0}
          onChange={handleChangeState}
        />
        <PasswordInput
          labelText={"변경 비밀번호"}
          name={"new_pw"}
          value={state.new_pw}
          inputRef={inputRef}
          index={1}
          onChange={handleChangeState}
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
        />
        {state.new_pwcheck.length > 0 && state.new_pw !== state.new_pwcheck && (
          <div className="pw_error">비밀번호가 일치하지 않습니다.</div>
        )}
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
