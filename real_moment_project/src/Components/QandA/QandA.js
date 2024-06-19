import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import axiosInstance from "../../api/AxiosInstance";
import Pagination from "../../util/Pagination";
import { getCookie } from "../../api/Cookies";
import WhiteButton from "../../util/Buttons/WhiteButton";
import ModalContainer from "../../util/ModalContainer";
import QandAEdit from "./QandAEdit";

Modal.setAppElement("#root");

const QandA = () => {
  const [itemQAList, setItemQAList] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const valueRef = useRef([]);
  // const [currentDetail, setCurrentDetail] = useState(null);
  const [state, setState] = useState({
    title: "",
    content: "",
  });

  const customStyles = {
    content: {
      top: "54%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      height: "auto",
      maxHeight: "auto",
      marginTop: "30px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
    },
  };

  const fetchItemQandA = () => {
    axiosInstance
      .get(`/member/${getCookie("Id")}/QAList?nowPage=${nowPage}`)
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
  };

  useEffect(() => {
    fetchItemQandA();
  }, [nowPage]);

  const fetchQandAEditData = (itemQAId) => {
    axiosInstance
      .get(`/member/${getCookie("Id")}/QA/data?itemQAId=${itemQAId}`)
      .then((res) => {
        const titleData = res.data.title;
        const contentData = res.data.content;
        setState({
          title: titleData,
          content: contentData,
        });
        console.log("fetchQandAEditData GET ", res);
      })
      .catch((error) => {
        console.error("fetchQandAEditData GET Error:", error);
      });
  };

  const openWriteModal = (itemQAId) => {
    setIsWriteModalOpen(true);
    fetchQandAEditData(itemQAId);
  };

  const handleSubmit = (itemQAId) => {
    if (valueRef.current[0].value === "") {
      valueRef.current[0].focus();
      return;
    }

    axiosInstance
      .patch(`/member/${getCookie("Id")}/QA`, {
        itemQAId: itemQAId,
        title: state.title,
        content: state.content,
      })
      .then((res) => {
        setState({
          title: "",
          content: "",
        });
        setIsWriteModalOpen(false);
        fetchItemQandA();
        console.log("handleSubmit PATCH ", res);
      })
      .catch((error) => {
        console.error("handleSubmit PATCH Error:", error);
      });
  };

  const onRemove = (itemQAId) => {
    axiosInstance
      .delete(`/member/${getCookie("Id")}/QA?itemQAId=${itemQAId}`)
      .then((res) => {
        fetchItemQandA();
        console.log("onRemove DELETE ", res);
      })
      .catch((error) => {
        console.error("onRemove DELETE Error:", error);
      });
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

  return (
    <div className="QandA">
      <h2>Q&A</h2>
      <h3>
        <center>내가 작성한 Q&A</center>
      </h3>
      <div className="QandABox">
        {itemQAList.length === 0 ? (
          <div className="none_review_list"> Q&A가 없습니다.</div>
        ) : (
          itemQAList.map((QA, index) => (
            <div className="review_list" key={index}>
              <a
                href={QA.item.sell === true ? `/detail/${QA.item.itemId}` : ""}
              >
                <div
                  className={`img ${
                    QA.item.stock === 0 || QA.item.sell === false
                      ? "stock-overlay"
                      : ""
                  }`}
                >
                  {QA.item.stock === 0 && (
                    <div className="stock-text">SOLD OUT</div>
                  )}
                  <img alt={`${QA.item.name} 이미지`} src={QA.item.mainImg} />
                </div>
              </a>
              <div className="info_content">
                <div className="info">
                  <div>
                    <strong>{QA.item.name}</strong>
                  </div>
                  <div>
                    작성일자 : {QA.createdDate.toString().split("T")[0]}
                  </div>
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
              <div className="btn_box">
                {QA.qaComment && QA.qaComment.content ? (
                  <div style={{ fontWeight: "bold", color: "rgb(220, 0, 0)" }}>
                    답변 완료
                  </div>
                ) : (
                  <div>
                    <WhiteButton
                      buttonText={"수정하기"}
                      onClick={() => openWriteModal(QA.itemQAId)}
                    />
                    <WhiteButton
                      buttonText={"삭제하기"}
                      onClick={() => onRemove(QA.itemQAId)}
                    />

                    <ModalContainer
                      isOpen={isWriteModalOpen}
                      onRequestClose={() => setIsWriteModalOpen(false)}
                      customStyles={customStyles}
                    >
                      {QA && (
                        <QandAEdit
                          h2Text={"나의 Q&A 수정하기"}
                          setIsModalOpen={setIsWriteModalOpen}
                          onClick={() => handleSubmit(QA.itemQAId)}
                          inputRef={valueRef}
                          textareaValue={state.content}
                          selectValue={state.title}
                          onChange={stateChange}
                        />
                      )}
                    </ModalContainer>
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

export default QandA;
