import { useState } from "react";

const EmailInput = ({
  index,
  value,
  onChange,
  inputRef,
  labelText,
  autoComplete,
}) => {
  const [emailValid, setEmailVaild] = useState(false);

  const handleChange = (e) => {
    onChange(e); // 부모 컴포넌트로부터 전달된 onChange 함수 호출
    handleEmailChange(e); // 내부 비밀번호 유효성 검사 함수 호출
  };

  const handleEmailChange = (e) => {
    // 비밀번호 유효성 검사
    if (e.target.name === "email") {
      setEmailVaild(validateEmail(value));
    }
  };

  const validateEmail = (value) => {
    const emailReg = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
    return emailReg.test(value);
  };

  return (
    <div className="EmailInput">
      <div className="signup_title">{labelText}</div>
      <input
        className="input"
        placeholder="ex) abc1234@gmail.com"
        name="email"
        value={value}
        onChange={handleChange}
        ref={(el) => (inputRef.current[index] = el)}
        autoComplete={autoComplete}
      />
      {!emailValid && value.length > 0 && (
        <div className="pw_error">이메일 형식을 지켜 입력해주세요.</div>
      )}
    </div>
  );
};

export default EmailInput;
