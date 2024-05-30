import "../styles/PeriodSelector.css";

const PeriodSelector = ({ selectedPeriod, handleRadioChange }) => {
  return (
    <div className="PeriodSelector">
      <div className="content" style={{ border: 0 }}>
        <span className="title">기간 조회</span>
        {[
          { label: "15일", value: "15days" },
          { label: "1개월", value: "1month" },
          { label: "2개월", value: "2months" },
          { label: "3개월", value: "3months" },
          { label: "6개월", value: "6months" },
        ].map((period) => (
          <label key={period.value}>
            <input
              type="radio"
              checked={selectedPeriod === period.value}
              onChange={() => handleRadioChange(period.value)}
            />
            {period.label}
          </label>
        ))}
      </div>
    </div>
  );
};
export default PeriodSelector;
