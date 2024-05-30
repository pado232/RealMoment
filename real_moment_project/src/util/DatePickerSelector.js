import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import "../styles/DatePickerSelector.css";
// import { ko } from "date-fns/esm/locale";

const DatePickerSelector = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleSearch,
}) => {
  return (
    <div className="DatePickerSelector">
      <div className="content">
        <span className="title">날짜 조회</span>
        <DatePicker
          showIcon
          // locale={ko}
          dateFormat="yyyy-MM-dd"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <span style={{ padding: 10 }}>-</span>
        <DatePicker
          showIcon
          // locale={ko}
          dateFormat="yyyy-MM-dd"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
        <button className="search" onClick={handleSearch}>
          검색
        </button>
      </div>
    </div>
  );
};

export default DatePickerSelector;
