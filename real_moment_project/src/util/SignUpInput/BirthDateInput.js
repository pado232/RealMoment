import { YEAR } from "../SignUpUtil/Year";
import { MONTH } from "../SignUpUtil/Month";
import { DAY } from "../SignUpUtil/Day";

const BirthDateInput = ({ state, handleChangeState }) => {
  return (
    <div className="BirthDateInput">
      <div className="signup_title">생년월일</div>
      <select name="year" value={state.year} onChange={handleChangeState}>
        <option value="">출생년도</option>
        {YEAR.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <select
        name="month"
        value={state.month}
        style={{ marginLeft: 30 }}
        onChange={handleChangeState}
      >
        <option value="">월</option>
        {MONTH.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <select
        name="day"
        value={state.day}
        style={{ marginLeft: 30 }}
        onChange={handleChangeState}
      >
        <option value="">일</option>
        {DAY.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BirthDateInput;
