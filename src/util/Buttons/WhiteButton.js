import "../../styles/MyButton.css";
const WhiteButton = ({ onClick, buttonText, style }) => {
  return (
    <div className="WhiteButton">
      <button style={style} onClick={onClick}>
        <span>{buttonText}</span>
      </button>
    </div>
  );
};

export default WhiteButton;
