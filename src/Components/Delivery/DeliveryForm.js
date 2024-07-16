import React, { useState } from "react";
import AddressInput from "../../util/SignUpInput/AddressInput";
import PhoneInput from "../../util/SignUpInput/PhoneInput";
import WhiteButton from "../../util/Buttons/WhiteButton";
import "../../styles/Delivery.css";

const DeliveryForm = ({
  handleChangeState,
  handleAddressChange,
  inputRef,
  indexOne,
  indexTwo,
  state,
  handleSubmit,
  iconData,
  defaultSetting,
}) => {
  const iconSize = 10 * 3;
  const [addressModalIsOpen, setAddressModalIsOpen] = useState(false);

  return (
    <div className="DeliveryForm">
      <div className="signup_content">
        <div className="Delivery_icon">
          <ul>
            {iconData.map((item, index) => (
              <li
                key={index}
                className={item.value === state.icon ? "click" : ""}
                onClick={() =>
                  handleChangeState({
                    target: { name: "icon", value: item.value },
                  })
                }
              >
                <div className="icon">
                  {item.iconcom && <item.iconcom size={iconSize} />}
                </div>
                <div
                  className="icon_location"
                  ref={(el) => (inputRef.current[index + 1] = el)}
                  name="icon"
                  value={item.value}
                >
                  {item.value}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="signup_title">받는 사람</div>
        <input
          className="input"
          name="recipient"
          value={state.recipient}
          onChange={handleChangeState}
          ref={(el) => (inputRef.current[4] = el)}
        />

        <AddressInput
          state={state}
          handleChangeState={handleChangeState}
          onAddressChange={handleAddressChange}
          inputRef={inputRef}
          modalIsOpen={addressModalIsOpen}
          setModalIsOpen={setAddressModalIsOpen}
        />
        <PhoneInput
          state={state}
          handleChangeState={handleChangeState}
          indexOne={indexOne}
          indexTwo={indexTwo}
          inputRef={inputRef}
          autoCompletePhoneOne={"phone-one"}
          autoCompletePhoneTwo={"phone-two"}
        />
        {state.default && (
          <div style={{ fontSize: 14, padding: 5 }}>
            <center>
              기본 배송지로 설정되었습니다. 배송지 등록하기를 눌러 저장해주세요.
            </center>
          </div>
        )}

        <div className="btn_box">
          <WhiteButton buttonText={"배송지 등록하기"} onClick={handleSubmit} />
          {!state.default && (
            <div>
              <button className="default" onClick={defaultSetting}>
                기본 배송지로 설정
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
