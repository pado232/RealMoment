import React from "react";
import Container from "../util/Container";
import { useEffect, useState, useRef, useCallback } from "react";
import ImageComponent from "../Components/New/ImageComponent";
import TextComponent from "../Components/New/TextComponent";
import "../styles/New.css";
import axiosInstanceWithoutAuth from "../api/AxioxInstanceWithoutAuth";
import usePageTitle from "../hooks/usePageTitle";

const descriptions = [
  <>
    <div>C립스틱</div>
    <div style={{ fontSize: 22, fontWeight: "bold" }}>차원이 다른 발색력</div>
    <div style={{ fontSize: 18 }}>
      발색의 끝판왕 립스틱을 경험해보세요. <br />
      이 립스틱은 뛰어난 지속력과 선명한 색상으로 당신의 입술을 더욱 매력적으로
      만들어 줍니다. <br />
      여러 색상 옵션을 통해 다양한 분위기를 연출할 수 있으며, <br />
      부드럽고 촉촉한 텍스처로 입술을 편안하게 유지해 줍니다.
    </div>
  </>,
  <>
    <div>B마스크 팩</div>
    <div style={{ fontSize: 22, fontWeight: "bold" }}>자극에 지친 피부</div>
    <div style={{ fontSize: 18 }}>
      여름철 자극된 피부에 진정을 주세요. <br />
      사용 후 피부가 부드럽고 탄력있게 변하며, <br />
      매일의 피부 관리에 필수적인 아이템입니다.
    </div>
  </>,
  <>
    <div>C클랜징 오일</div>
    <div style={{ fontSize: 22, fontWeight: "bold" }}>모공 안 노페물까지</div>
    <div style={{ fontSize: 18 }}>
      클렌징오일의 완벽한 클렌징을 경험해보세요. <br />
      이 클렌징오일은 메이크업과 피부의 불순물을 깨끗하게 제거하면서도 <br />
      피부를 촉촉하게 유지해 줍니다. <br />
      풍부한 영양 성분이 피부를 부드럽고 건강하게 만들어 주며, <br />
      모든 피부 타입에 적합합니다.
    </div>
  </>,
];
const New = () => {
  usePageTitle(`NEW`);
  const [newImgs, setNewImgs] = useState([]);
  const imgRefs = useRef([]);
  const textRefs = useRef([]);

  const fetchNewImgs = useCallback(() => {
    const param = "신상";
    axiosInstanceWithoutAuth
      .get(`/image?imageLocation=${param}`)
      .then((res) => {
        const imgData = res.data.imageListResponse;
        const filteredImgs = imgData.filter((img) => img.show);
        setNewImgs(filteredImgs);
        console.log("fetchNewImgs GET", res);
      })
      .catch((error) => {
        console.log("fetchNewImgs Error", error);
      });
  }, []);

  useEffect(() => {
    fetchNewImgs();
  }, [fetchNewImgs]);

  useEffect(() => {
    const imgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            entry.target.classList.remove("hide");
          } else {
            entry.target.classList.remove("show");
            entry.target.classList.add("hide");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "1000px 0px -200px 0px", // 이미지가 보이기 시작하는 시점
      }
    );

    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            entry.target.classList.remove("hide");
          } else {
            entry.target.classList.remove("show");
            entry.target.classList.add("hide");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "1000px 0px -100px 0px", // 텍스트가 보이기 시작하는 시점
      }
    );

    const currentImgRefs = imgRefs.current;
    const currentTextRefs = textRefs.current;

    currentImgRefs.forEach((img) => {
      if (img) {
        imgObserver.observe(img);
      }
    });

    currentTextRefs.forEach((text) => {
      if (text) {
        textObserver.observe(text);
      }
    });

    return () => {
      currentImgRefs.forEach((img) => {
        if (img) {
          imgObserver.unobserve(img);
        }
      });
      currentTextRefs.forEach((text) => {
        if (text) {
          textObserver.unobserve(text);
        }
      });
    };
  }, [newImgs]);

  return (
    <div className="New">
      <Container>
        <div className="img_list">
          {newImgs.length === 0 ? (
            <div>No Images ...</div>
          ) : (
            newImgs.map((img, index) => (
              <div key={index} className="item_with_text">
                <ImageComponent
                  ref={(el) => (imgRefs.current[index] = el)}
                  img={img}
                  index={index}
                />
                <TextComponent
                  ref={(el) => (textRefs.current[index] = el)}
                  text={descriptions[index]}
                  index={index}
                />
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
};

export default New;
