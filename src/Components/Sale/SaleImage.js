import React, { useState } from "react";
import "../../styles/SaleImg.css";

const SaleImages = ({ saleImgs }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesToShow = 3; // 한번에 보여줄 슬라이드 개수
  const totalSlides = saleImgs.length;
  const maxSlide = totalSlides > slidesToShow ? totalSlides - slidesToShow : 0; // 여백 없이 보여줄 수 있는 최대 슬라이드 인덱스

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide)); // 최대로 이동할 수 있는 슬라이드까지만 이동
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0)); // 처음 슬라이드까지 이동
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
            transform: `translateX(-${(currentSlide * 100) / slidesToShow}%)`, // 슬라이드를 하나씩 이동
            width: `${(totalSlides * 100) / slidesToShow}%`, // 슬라이드 개수에 맞춰 슬라이더 전체 너비 설정
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
