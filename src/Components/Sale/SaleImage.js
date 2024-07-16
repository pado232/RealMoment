import React, { useState } from "react";
import "../../styles/SaleImg.css";

const SaleImages = ({ saleImgs }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesToShow = 3;
  const totalSlides = saleImgs.length;
  const maxSlide = totalSlides - slidesToShow;

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const progressPercentage = ((currentSlide + 1) / (maxSlide + 1)) * 100;

  return (
    <div className="slider-container">
      <button className="slider-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      <div className="slider-wrapper">
        <div
          className="slider"
          style={{
            transform: `translateX(-${(currentSlide * 100) / slidesToShow}%)`,
          }}
        >
          {saleImgs.map((img, index) => (
            <div className="slide" key={index}>
              <a href={img.linkUrl}>
                <img src={img.imgUrl} alt={`이미지 ${index + 1}`} />
              </a>
            </div>
          ))}
        </div>
      </div>
      <button className="slider-button next" onClick={nextSlide}>
        &#10095;
      </button>
      <div className="slider-progress">
        <div
          className="slider-progress-bar"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SaleImages;
