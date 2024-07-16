import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "../styles/HomeMainImg.css";

const HomeMainImg = ({ homeImgs }) => {
  const [current, setCurrent] = useState(1); // 클론된 슬라이드를 고려하여 시작 인덱스를 1로 설정
  const [isTransitioning, setIsTransitioning] = useState(false);
  const length = homeImgs.length;

  const nextSlide = () => {
    if (isTransitioning) return; // 트랜지션 중에는 실행하지 않음
    setIsTransitioning(true);
    setCurrent((prevCurrent) => prevCurrent + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return; // 트랜지션 중에는 실행하지 않음
    setIsTransitioning(true);
    setCurrent((prevCurrent) => prevCurrent - 1);
  };

  useEffect(() => {
    let interval = null;
    if (length > 1) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000); // 3초마다 이미지 변경
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [length]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (current === length + 1) {
      setCurrent(1); // 마지막 슬라이드 클론에서 첫 번째 실제 슬라이드로 이동
    } else if (current === 0) {
      setCurrent(length); // 첫 번째 슬라이드 클론에서 마지막 실제 슬라이드로 이동
    }
  };

  return (
    <div className="HomeMainImg">
      {length === 0 ? (
        <div className="no-image-warning">
          <div className="title">No Images</div>
          <div>홈 메인 이미지가 없습니다.</div>
          <div>관리자 페이지에서 '홈 메인 이미지'를 추가해주세요.</div>
        </div>
      ) : (
        <div className="imgSlider">
          <div className="imgSlider-arrows">
            <IoIosArrowBack
              className="imgSlider-arrow left"
              size="35"
              onClick={prevSlide}
            />
            <IoIosArrowForward
              className="imgSlider-arrow right"
              size="35"
              onClick={nextSlide}
            />
          </div>
          <div
            className="slides-container"
            style={{
              transform: `translateX(-${current * 100}%)`,
              transition: isTransitioning ? "transform 1s ease" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {/* 슬라이드를 렌더링하는 부분, 클론 슬라이드 추가 */}
            <div className="slide">
              <a href={homeImgs[length - 1].linkUrl}>
                <img
                  src={homeImgs[length - 1].imgUrl} // 마지막 슬라이드 클론 추가
                  alt={`이미지 ${length}`}
                  className="homeimage"
                />
              </a>
            </div>
            {homeImgs.map((img, index) => (
              <div key={index} className="slide">
                <a href={img.linkUrl}>
                  <img
                    src={img.imgUrl}
                    alt={`이미지 ${index + 1}`}
                    className="homeimage"
                  />
                </a>
              </div>
            ))}
            <div className="slide">
              <a href={homeImgs[0].linkUrl}>
                <img
                  src={homeImgs[0].imgUrl} // 첫 번째 슬라이드 클론 추가
                  alt={`이미지 1`}
                  className="homeimage"
                />
              </a>
            </div>
          </div>
          <div className="indicators">
            {/* 인디케이터를 렌더링하는 부분 */}
            {homeImgs.map((_, index) => (
              <div
                key={index}
                className={
                  index === (current - 1 + length) % length // 현재 슬라이드에 맞춰 인디케이터 활성화
                    ? "indicator active"
                    : "indicator"
                }
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setCurrent(index + 1);
                  }
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeMainImg;
