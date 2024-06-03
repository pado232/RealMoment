import React from "react";
import { useState } from "react";

const PasswordInput = ({
  name,
  index,
  labelText,
  value,
  onChange,
  inputRef,
  autoComplete,
}) => {
  const [pwValid, setPwValid] = useState(false);

  const handleChange = (e) => {
    onChange(e); // 부모 컴포넌트로부터 전달된 onChange 함수 호출
    handlePasswordChange(e); // 내부 비밀번호 유효성 검사 함수 호출
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    // 비밀번호 유효성 검사
    if (name === "pw") {
      setPwValid(validatePassword(value));
    }
    if (name === "new_pw") {
      setPwValid(validatePassword(value));
    }
  };

  const validatePassword = (value) => {
    const pwReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    return pwReg.test(value);
  };

  return (
    <div>
      <div className="signup_title">{labelText}</div>
      <input
        className="input"
        name={name}
        value={value}
        type="password"
        maxLength="20"
        onChange={handleChange}
        ref={(el) => (inputRef.current[index] = el)}
        autoComplete={autoComplete}
      />
      {!pwValid && value.length > 0 && (
        <div className="pw_error">
          영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
        </div>
      )}
    </div>
  );
};
export default PasswordInput;
