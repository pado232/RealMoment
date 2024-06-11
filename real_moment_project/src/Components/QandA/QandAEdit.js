import WhiteButton from "../../util/Buttons/WhiteButton";

import "../../styles/MyPage.css";

const QandAEdit = ({
  onClick,
  setIsModalOpen,
  h2Text,
  selectValue,
  inputRef,
  onChange,
  textareaValue,
}) => {
  return (
    <div className="ReviewWriteBox">
      <div className="review_write_box" style={{ margin: 50, width: 500 }}>
        <h2>{h2Text}</h2>

        <div className="content_warpper">
          <div style={{ margin: "0 10px ", textAlign: "start" }}>
            Q&A 카테고리 : <strong>{selectValue}</strong>
          </div>
          <div>
            <textarea
              name="content"
              value={textareaValue}
              onChange={onChange}
              ref={(el) => (inputRef.current[0] = el)}
              placeholder="해당 상품에 대해 자유롭게 Q&A를 작성해주세요!! _🖍&#13;&#13;Q&A는 보고 계신 현재 상품에 대한 문의입니다. &#13;해당 상품에 대한 문의가 아닌 포괄적인 문의가 있으시다면 마이페이지 > 1:1 문의를 이용해주세요.&#13;"
            />
          </div>
        </div>
        <div className="button_warpper">
          <WhiteButton
            buttonText={"취소"}
            onClick={() => setIsModalOpen(false)}
          />
          <WhiteButton
            style={{ marginLeft: 80 }}
            buttonText={"등록하기"}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

export default QandAEdit;
