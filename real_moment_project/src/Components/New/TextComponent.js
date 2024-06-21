import React from "react";
import "../../styles/New.css";

const TextComponent = React.forwardRef(({ text, index }, ref) => (
  <div className="TextComponent">
    <div ref={ref} className="text_item">
      <div className="text_content">{text}</div>
    </div>
  </div>
));

export default TextComponent;
