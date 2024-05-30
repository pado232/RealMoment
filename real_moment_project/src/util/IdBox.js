const IdBox = ({
  icon: IconComponent,
  type,
  placeholder,
  iconSize,
  value,
  ref,
  name,
  onChange,
  text,
  autoComplete,
  onKeyPress,
}) => {
  return (
    <div className="IdBox">
      <div className="login_box">
        {IconComponent && <IconComponent size={iconSize} />}
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          ref={ref}
          autoComplete={autoComplete}
          onKeyPress={onKeyPress}
        />
      </div>
      {text}
    </div>
  );
};
export default IdBox;
