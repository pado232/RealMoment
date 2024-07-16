import { useState, useRef, useEffect, useCallback } from "react";
import Modal from "react-modal";
import ModalContainer from "../../util/ModalContainer";
import WhiteButton from "../../util/Buttons/WhiteButton";
import axiosInstance from "../../api/AxiosInstance";
import { getCookie } from "../../api/Cookies";
import Pagination from "../../util/Pagination";
import InquiryLookBox from "./InquriyLookBox";
import InquiryWriteBox from "./InquiryWriteBox";

import "../../styles/MyPage.css";

Modal.setAppElement("#root");

const MyInpuiry = () => {
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

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isLookModalOpen, setIsLookModalOpen] = useState(false);
  const [currentDetail, setCurrentDetail] = useState(null);
  const [oneOnOneList, setOneOnOneList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);
  const [inquiry, setInquiry] = useState({
    oneOnOneId: "",
    title: "",
    content: "",
  });

  const MyInquiryList = useCallback(() => {
    axiosInstance
      .get(`/member/${getCookie("Id")}/oneOnOneList?nowPage=${nowPage}`)
      .then((res) => {
        const oneOnOneListtdata = res.data.oneOnOneList;
        const totalPagedata = res.data.totalPage;
        const nowPagedata = res.data.nowPage;

        setOneOnOneList(oneOnOneListtdata);
        setTotalPage(totalPagedata);
        setNowPage(nowPagedata);

        console.log("MyInquiryList GET ", res);
      })
      .catch((error) => {
        console.error("MyInquiryList GET Error:", error);
      });
  }, [nowPage]);

  const MyInquiryEditData = (oneOnOneId) => {
    axiosInstance
      .get(`/member/${getCookie("Id")}/oneOnOne?oneOnOneId=${oneOnOneId}`)
      .then((res) => {
        const inquiryData = res.data;

        setInquiry(inquiryData);

        console.log("MyInquiryData GET ", res);
      })
      .catch((error) => {
        console.error("MyInquiryData GET Error:", error);
      });
  };

  const MyInquiryEdit = (oneOnOneId) => {
    axiosInstance
      .patch(`/member/${getCookie("Id")}/oneOnOne`, {
        oneOnOneId: oneOnOneId,
        title: inquiry.title,
        content: inquiry.content,
      })
      .then((res) => {
        MyInquiryList();
        console.log("MyInquiryEdit GET ", res);
      })
      .catch((error) => {
        console.error("MyInquiryEdit GET Error:", error);
      });
  };

  const onRmove = (oneOnOneId) => {
    axiosInstance
      .delete(`/member/${getCookie("Id")}/oneOnOne?oneOnOneId=${oneOnOneId}`)
      .then((res) => {
        MyInquiryList();
        console.log("MyInquiryEdit GET ", res);
      })
      .catch((error) => {
        console.error("MyInquiryEdit GET Error:", error);
      });
  };

  useEffect(() => {
    MyInquiryList();
  }, [MyInquiryList, nowPage]);

  const openWriteModal = (inquiry) => {
    MyInquiryEditData(inquiry.oneOnOneId);
    setIsWriteModalOpen(true);
    setCurrentDetail(inquiry);
  };

  const openLookModal = (inquiry) => {
    setCurrentDetail(inquiry);
    setIsLookModalOpen(true);
  };

  const inputRef = useRef([]);
  const handleStateChange = (e) => {
    const { name, value } = e.target;

    setInquiry({
      ...inquiry,
      [name]: value,
    });
  };

  const handleSubmit = (oneOnOneId) => {
    for (let i = 0; i < inputRef.current.length; i++) {
      if (inputRef.current[i].value === "") {
        inputRef.current[i].focus();
        return;
      }
    }
    setIsWriteModalOpen(false);

    MyInquiryEdit(oneOnOneId);
  };

  return (
    <div className="ReviewMine">
      <h2>내가 작성한 1:1 문의</h2>

      <table>
        <colgroup style={{ width: 800 }} />
        <colgroup style={{ width: 250 }} />
        <colgroup style={{ width: 500 }} />
        <thead>
          <tr>
            <th>나의 문의</th>
            <th>문의 답변 상태</th>
            <th>작성한 문의/답변</th>
          </tr>
        </thead>
        <tbody>
          {oneOnOneList.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">
                <div> 해당 데이터가 없습니다.</div>
              </td>
            </tr>
          ) : (
            oneOnOneList.map((it, index) => (
              <tr key={index}>
                <td>
                  <div className="title">
                    {it.title.length > 20
                      ? it.title.slice(0, 20) + "..."
                      : it.title}
                  </div>
                  <div className="content">
                    {it.content.length > 20
                      ? it.content.slice(0, 30) + "..."
                      : it.content}
                  </div>
                </td>
                <td>
                  <div className="comment">
                    {it.comment ? (
                      <div className="completed">답변 완료</div>
                    ) : (
                      <div className="waiting">답변 대기중</div>
                    )}
                  </div>
                </td>
                <td>
                  <div>
                    {!it.comment ? (
                      <div className="button_conta">
                        <WhiteButton
                          buttonText={"상세보기 / 수정하기"}
                          onClick={() => openWriteModal(it)}
                        />

                        <WhiteButton
                          buttonText={"삭제하기"}
                          onClick={() => onRmove(it.oneOnOneId)}
                        />

                        <ModalContainer
                          isOpen={isWriteModalOpen}
                          onRequestClose={() => setIsWriteModalOpen(false)}
                          customStyles={customStyles}
                        >
                          {inquiry && (
                            <InquiryWriteBox
                              h2Text={"나의 문의 수정하기"}
                              setIsModalOpen={setIsWriteModalOpen}
                              onClick={() => handleSubmit(inquiry.oneOnOneId)}
                              inputRef={inputRef}
                              textareaValue={inquiry.content}
                              inputValue={inquiry.title}
                              onChange={handleStateChange}
                            />
                          )}
                        </ModalContainer>
                      </div>
                    ) : (
                      <div>
                        <WhiteButton
                          buttonText={"답변 보기"}
                          onClick={() => openLookModal(it)}
                        />
                        <ModalContainer
                          isOpen={isLookModalOpen}
                          onRequestClose={() => setIsLookModalOpen(false)}
                          customStyles={customStyles}
                        >
                          {currentDetail && (
                            <InquiryLookBox
                              itemTitle={currentDetail.title}
                              itemContent={currentDetail.content}
                              itemCommnetContent={
                                currentDetail.comment?.content || ""
                              }
                              setIsModalOpen={setIsLookModalOpen}
                            />
                          )}
                        </ModalContainer>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

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
export default MyInpuiry;
