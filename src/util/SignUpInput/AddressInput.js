import DaumPostcode from "react-daum-postcode";
import ModalContainer from "../ModalContainer";

const AddressInput = ({
  state,
  handleChangeState,
  onAddressChange,
  modalIsOpen,
  setModalIsOpen,
  autoCompleteNum,
  autoCompleteAddress,
  autoCompleteAddressDetail,
}) => {
  const handleComplete = (data) => {
    setModalIsOpen(false);
    let numAddress = data.zonecode;
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    onAddressChange({
      numAddress,
      fullAddress,
    });
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const postCodeStyle = {
    paddingLeft: "30px",
    paddingRigth: "20px",
    paddingBottom: "10px",
    paddingTop: "20px",
    width: "400px",
    height: "500px",
  };

  return (
    <div className="AddressInput">
      <div className="signup_title">주소</div>
      <div>
        <button className="greenbutton" onClick={() => setModalIsOpen(true)}>
          우편번호 찾기
        </button>
      </div>

      {modalIsOpen && (
        <ModalContainer
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          customStyles={customStyles}
        >
          <DaumPostcode onComplete={handleComplete} style={postCodeStyle} />
        </ModalContainer>
      )}
      {/* <ModalContainer
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        customStyles={customStyles}
      >
        <DaumPostcode onComplete={handleComplete} style={postCodeStyle} />
      </ModalContainer> */}

      <input
        className="input"
        value={state.addrnum}
        readOnly
        name="addrnum"
        placeholder="우편번호 : 우편번호 찾기를 눌러주세요."
        onChange={handleChangeState}
        autoComplete={autoCompleteNum}
      />
      <input
        className="input"
        name="addr1"
        value={state.addr1}
        readOnly
        placeholder="주소 : 우편번호 찾기를 눌러주세요."
        onChange={handleChangeState}
        autoComplete={autoCompleteAddress}
      />
      <input
        className="input"
        name="addr2"
        placeholder="상세주소"
        value={state.addr2}
        onChange={handleChangeState}
        autoComplete={autoCompleteAddressDetail}
      />
    </div>
  );
};

export default AddressInput;
