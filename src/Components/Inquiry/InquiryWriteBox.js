import WhiteButton from "../../util/Buttons/WhiteButton";

import "../../styles/MyPage.css";

const InquiryWriteBox = ({
  onClick,
  setIsModalOpen,
  h2Text,
  inputValue,
  inputRef,
  onChange,
  textareaValue,
}) => {
  return (
    <div className="ReviewWriteBox">
      <div className="review_write_box" style={{ margin: 50, width: 500 }}>
        <h2>{h2Text}</h2>

        <div className="content_warpper">
          <div style={{ marginTop: 50 }}>
            <strong>불편 사항이 있으시다면 편하게 문의해주세요!!🖤</strong>
          </div>
          <div>
            <input
              type="text"
              name="title"
              value={inputValue}
              onChange={onChange}
              ref={(el) => (inputRef.current[0] = el)}
              placeholder="제목을 입력해주세요."
            />
          </div>
          <div>
            <textarea
              name="content"
              value={textareaValue}
              onChange={onChange}
              ref={(el) => (inputRef.current[1] = el)}
              placeholder="불편 사항이 있으신가요? 혹은 궁금한 점이 있으신가요? &#13;문의할 내용을 입력해주세요.&#13;RealMoment가 여러분의 소중한 한마디 한마디에 귀를 기울이겠습니다!&#13;&#13;- 전화 문의를 원하신다면&#13;   ☎ 02) 1234-1234"
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

export default InquiryWriteBox;
