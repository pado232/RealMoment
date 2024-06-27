import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Pagination from "../../util/Pagination";
import MyButton from "../../util/Buttons/MyButton";
import axiosInstance from "../../api/AxiosInstance";
import { getCookie } from "../../api/Cookies";
import WhiteButton from "../../util/Buttons/WhiteButton";
import axiosInstanceWithoutAuth from "../../api/AxioxInstanceWithoutAuth";

const DetailQandA = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [itemQAList, setItemQAList] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const textRef = useRef([]);

  const [createButtonToggle, setCreateButtonToggle] = useState(false);
  const [state, setState] = useState({
    title: "",
    content: "",
  });

  const fetchItemQandA = useCallback(() => {
    axiosInstanceWithoutAuth
      .get(`/QAList?itemId=${itemId}&nowPage=${nowPage}`)
      .then((res) => {
        const itemQAListData = res.data.itemQAList;
        const nowPageData = res.data.nowPage;
        const totalPageData = res.data.totalPage;

        setItemQAList(itemQAListData);
        setNowPage(nowPageData);
        setTotalPage(totalPageData);

        console.log("fetchItemQandA GET ", res);
      })
      .catch((error) => {
        console.error("fetchItemQandA GET Error:", error);
      });
  }, [itemId, nowPage]);

  useEffect(() => {
    fetchItemQandA();
  }, [fetchItemQandA]);

  const fetchQandACreate = () => {
    axiosInstance
      .post(`/member/${getCookie("Id")}/QA`, {
        itemId: itemId,
        title: state.title,
        content: state.content,
      })
      .then((res) => {
        setState({
          title: "",
          content: "",
        });
        fetchItemQandA();
        console.log("fetchQandACreate Post ", res);
      })
      .catch((error) => {
        console.error("fetchQandACreate Post Error:", error);
      });
  };

  const createButton = () => {
    for (let i = 0; i < textRef.current.length; i++) {
      if (textRef.current[i].value === "") {
        textRef.current[i].focus();
        return;
      }
    }

    fetchQandACreate();
    setCreateButtonToggle(!createButtonToggle);
  };

  const stateChange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const paragraphs = (content) => {
    return content
      .split("\n")
      .map((paragraph, index) => <div key={index}>{paragraph}</div>);
  };

  const hiddenId = (id) => {
    let hiddenLoginId = id; // 변수 선언 변경
    if (id) {
      const idLength = id.length;
      const maskedId =
        id.substring(0, idLength / 2 - 1) +
        "*".repeat(4) +
        id.substring(idLength / 2 + 3);
      hiddenLoginId = maskedId;
    }
    return hiddenLoginId;
  };

  const handleCreateButtonClick = () => {
    const userId = getCookie("Id");
    if (userId) {
      setCreateButtonToggle(true);
    } else {
      setCreateButtonToggle(false);
      if (window.confirm("로그인이 필요합니다. 로그인 하시겠습니까?")) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="DetailQandA">
      <div className="caution_box">
        <div className="caution">
          <div>{`Q&A 내역 및 답변은 마이페이지 > Q&A에서 확인 가능합니다.`}</div>
          <div>
            {`Q&A 처리시간은 10:00 - 17:00입니다. (문의는 언제나 가능합니다!!)`}
          </div>
          <div>
            {` 빠른 시일 내에 접수 사항을 조치하여 해결해 드리도록 하겠습니다.`}
          </div>
          <div style={{ color: "#bb0000" }}>
            {`고객정보 보호를 위해 문의내용 본문에는 개인정보를 입력하지 말아주세요.`}
          </div>
          <div
            style={{ color: "#bb0000" }}
          >{`(예: 성명, 연락처, 이메일주소, 계좌번호 등)`}</div>
        </div>

        <div className="btn_box">
          <div className="btn">
            <MyButton
              buttonText={"Q&A 작성하기"}
              onClick={handleCreateButtonClick}
            />
          </div>
        </div>
      </div>

      {createButtonToggle && (
        <div className="QAbox">
          <div className="select_title">
            <strong style={{ marginRight: 10 }}>Q&A 카테고리 -</strong>
            <select
              name="title"
              value={state.title}
              ref={(el) => (textRef.current[0] = el)}
              onChange={stateChange}
            >
              <option value="" disabled hidden>
                카테고리를 선택해주세요.
              </option>
              <option value={"상품 문의"}>상품 문의</option>
              <option value={"주문 및 결제 문의"}>주문 및 결제 문의</option>
              <option value={"배송 문의"}>배송 문의</option>
              <option value={"이벤트 및 프로모션 문의"}>
                이벤트 및 프로모션 문의
              </option>
              <option value={"기타 문의"}>기타 문의</option>
            </select>
          </div>

          <div className="content_box">
            <textarea
              placeholder="해당 상품에 대해 자유롭게 Q&A를 작성해주세요!! _🖍&#13;&#13;Q&A는 보고 계신 현재 상품에 대한 문의입니다. &#13;해당 상품에 대한 문의가 아닌 포괄적인 문의가 있으시다면 마이페이지 > 1:1 문의를 이용해주세요.&#13;"
              name="content"
              value={state.content}
              ref={(el) => (textRef.current[1] = el)}
              onChange={stateChange}
            />
          </div>

          <div className="btn_wrapper">
            <WhiteButton buttonText={"등록하기"} onClick={createButton} />
          </div>
        </div>
      )}

      <div>
        {itemQAList.length === 0 ? (
          <div className="none_review_list"> Q&A가 없습니다.</div>
        ) : (
          itemQAList.map((QA, index) => (
            <div className="review_list" key={index}>
              <div className="info">
                <div>{hiddenId(QA.loginId)}</div>
                <div>작성일자 : {QA.createdDate.toString().split("T")[0]}</div>
                <div style={{ border: "none" }}>
                  수정일자 : {QA.lastModifiedDate.toString().split("T")[0]}
                </div>
              </div>

              <div className="review">
                <div className="title">{QA.title}</div>
                <div className="content">{paragraphs(QA.content)}</div>
              </div>
              <div>
                {QA.qaComment &&
                  QA.qaComment.content &&
                  QA.qaComment.content.trim() !== "" && (
                    <div className="qacomment_box">
                      {paragraphs(QA.qaComment.content)}
                    </div>
                  )}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="pagination">
        <Pagination
          setNowPage={setNowPage}
          nowPage={nowPage}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
};

export default DetailQandA;
