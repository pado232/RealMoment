import React from "react";
import "../../styles/New.css";

const ImageComponent = React.forwardRef(({ img, index }, ref) => (
  <div className="ImageComponent">
    <div ref={ref} className="image_item">
      <a href={img.linkUrl}>
        <img
          className="image_img"
          src={img.imgUrl}
          alt={`신상 이미지 ${index + 1}`}
        />
      </a>
    </div>
  </div>
));

export default ImageComponent;
