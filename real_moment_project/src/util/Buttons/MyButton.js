import "../../styles/MyButton.css";
const MyButton = ({ icon: IconComponent, onClick, buttonText, style }) => {
  const checkIconSize = 8 * 3;
  return (
    <div className="MyButton">
      <button style={style} onClick={onClick}>
        <span>{buttonText}</span>
        {IconComponent && <IconComponent size={checkIconSize} />}
      </button>
    </div>
  );
};

export default MyButton;
