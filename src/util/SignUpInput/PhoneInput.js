const sortOptionList = [
  { value: "010" },
  { value: "011" },
  { value: "016" },
  { value: "017" },
  { value: "018" },
  { value: "019" },
];

const PhoneInput = ({
  state,
  handleChangeState,
  inputRef,
  indexOne,
  indexTwo,
  autoCompletePhoneOne,
  autoCompletePhoneTwo,
}) => {
  return (
    <div className="PhoneInput">
      <div className="signup_title">휴대전화</div>
      <select name="phone1" value={state.phone1} onChange={handleChangeState}>
        {sortOptionList.map((it) => (
          <option key={it.value} value={it.value}>
            {it.value}
          </option>
        ))}
      </select>
      <span>-</span>
      <input
        className="input"
        placeholder="0000"
        style={{ width: 50 }}
        maxLength="4"
        name="phone2"
        value={state.phone2}
        onChange={handleChangeState}
        ref={(el) => (inputRef.current[indexOne] = el)}
        autoComplete={autoCompletePhoneOne}
      />
      <span>-</span>
      <input
        className="input"
        placeholder="0000"
        style={{ width: 50 }}
        maxLength="4"
        name="phone3"
        value={state.phone3}
        onChange={handleChangeState}
        ref={(el) => (inputRef.current[indexTwo] = el)}
        autoComplete={autoCompletePhoneTwo}
      />
    </div>
  );
};

export default PhoneInput;
