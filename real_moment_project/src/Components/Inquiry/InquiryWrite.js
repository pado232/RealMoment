import React, { useRef, useState } from "react";
import ModalContainer from "../../util/ModalContainer";
import axiosInstance from "../../api/AxiosInstance";
import { getCookie } from "../../api/Cookies";
import InquiryWriteBox from "./InquiryWriteBox";

import "../../styles/Delivery.css";

const InquiryWrite = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inquiry, setInquiry] = useState({
    title: "",
    content: "",
  });

  const customStyles = {
    content: {
      top: "49%",
      left: "52%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
    },
  };

  const inputRef = useRef([]);

  /** state 유효성 검사 */
  const handleChangeState = (e) => {
    const { name, value } = e.target;

    setInquiry({
      ...inquiry,
      [name]: value,
    });
  };

  const handleCreate = () => {
    for (let i = 1; i < inputRef.current.length; i++) {
      if (inputRef.current[i].value === "") {
        inputRef.current[i].focus();
        return;
      }
    }

    axiosInstance
      .post(`/member/${getCookie("Id")}/oneOnOne`, {
        title: inquiry.title,
        content: inquiry.content,
      })
      .then((res) => {
        setInquiry({
          title: "",
          content: "",
        });
        setModalIsOpen(false);
        console.log("inquiry POST ", res);
      })
      .catch((error) => {
        console.error("inquiry POST Error:", error);
      });
  };

  return (
    <div className="Delivery">
      <div className="caution">
        <h2>문의 하기 전 꼭! 확인해주세요</h2>
        <div>
          {`1:1 문의 처리시간은 10:00 - 17:00입니다. (문의는 언제나 가능합니다!!)`}
        </div>
        <div>
          {` 빠른 시일 내에 접수 사항을 조치하여 해결해 드리도록 하겠습니다.`}
        </div>
        <div>
          {`고객정보 보호를 위해 상담내용 본문에는 개인정보를 입력하지 말아주세요.`}
        </div>
        <div>{`(예: 성명, 연락처, 이메일주소, 계좌번호 등)`}</div>
      </div>

      <div className="button_add">
        <button onClick={() => setModalIsOpen(true)}>1:1 문의 하기</button>
      </div>

      <ModalContainer
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        customStyles={customStyles}
      >
        <InquiryWriteBox
          h2Text={"1:1 문의 작성하기"}
          setIsModalOpen={setModalIsOpen}
          onClick={handleCreate}
          inputRef={inputRef}
          textareaValue={inquiry.content}
          inputValue={inquiry.title}
          onChange={handleChangeState}
        />
      </ModalContainer>
    </div>
  );
};

export default InquiryWrite;
