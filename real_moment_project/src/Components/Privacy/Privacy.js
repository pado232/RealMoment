import { useState } from "react";
import EditPassword from "./EditPassword";
import EditEmail from "./EditEmail";
import WhiteButton from "../../util/Buttons/WhiteButton";

import "../../styles/Privacy.css";

const infoDummy = [
  {
    info_id: "qwer123",
    info_pw: "qwer123!!",
    info_email: "qwer123@naver.com",
    info_name: "성춘향",
    info_male: "여자",
    info_birth: "1999.01.01",
  },
];

const hideSensitiveInfo = (info) => {
  const hiddenInfo = { ...info };

  // 패스워드를 *로 숨김
  hiddenInfo.info_pw = "*".repeat(hiddenInfo.info_pw.length);

  // 아이디의 가운데 5자리를 *로 숨김
  const idLength = hiddenInfo.info_id.length;
  const maskedId =
    hiddenInfo.info_id.substring(0, idLength / 2 - 1) +
    "*".repeat(4) +
    hiddenInfo.info_id.substring(idLength / 2 + 3);
  hiddenInfo.info_id = maskedId;

  // 이름을 숨김
  const nameLength = hiddenInfo.info_name.length;
  if (nameLength === 2) {
    // 이름의 길이가 2글자인 경우 가운데 1글자만 숨김
    hiddenInfo.info_name =
      hiddenInfo.info_name.substring(0, 1) +
      "*" +
      hiddenInfo.info_name.substring(2);
  } else if (nameLength % 2 === 1) {
    // 이름의 길이가 홀수인 경우 가운데 글자를 숨김
    const middleIndex = Math.floor(nameLength / 2);
    hiddenInfo.info_name =
      hiddenInfo.info_name.substring(0, middleIndex) +
      "*" +
      hiddenInfo.info_name.substring(middleIndex + 1);
  } else {
    // 이름의 길이가 짝수인 경우 가운데 두 글자를 숨김
    const middleIndex = nameLength / 2;
    hiddenInfo.info_name =
      hiddenInfo.info_name.substring(0, middleIndex - 1) +
      "**" +
      hiddenInfo.info_name.substring(middleIndex + 1);
  }
  // 이메일 가운데 4글자를 *로 숨기고, 도메인 부분의 문자를 .이 나올 때까지 *로 숨김
  const atIndex = hiddenInfo.info_email.indexOf("@");
  const dotIndex = hiddenInfo.info_email.lastIndexOf(".");
  if (atIndex !== -1 && dotIndex !== -1 && atIndex < dotIndex) {
    const beforeAt = hiddenInfo.info_email.substring(0, atIndex);
    const afterAt = hiddenInfo.info_email.substring(atIndex + 1, dotIndex);
    const afterDot = hiddenInfo.info_email.substring(dotIndex);
    const maskedEmail =
      beforeAt.substring(0, Math.max(0, Math.floor(beforeAt.length / 2) - 1)) +
      "*".repeat(4) +
      beforeAt.substring(Math.ceil(beforeAt.length / 2) + 2) +
      "@" +
      "*".repeat(afterAt.length) +
      afterDot;
    hiddenInfo.info_email = maskedEmail;
  }

  // 생년월일을 숨김
  const birthParts = hiddenInfo.info_birth.split("."); // 생년월일을 년, 월, 일로 분리
  if (birthParts.length === 3) {
    const year = birthParts[0]; // 년도 부분
    const month = birthParts[1]; // 월 부분
    const day = birthParts[2]; // 일 부분
    const hiddenMonth = "*".repeat(month.length); // 월을 '*'로 대체
    const hiddenDay = "*".repeat(day.length); // 일을 '*'로 대체
    hiddenInfo.info_birth = `${year}.${hiddenMonth}.${hiddenDay}`; // 숨겨진 월과 일을 조합하여 반환
  }

  return hiddenInfo;
};

const Privacy = ({ goToDelivery }) => {
  const hiddenInfo = hideSensitiveInfo(infoDummy[0]);
  const [editingPassword, setEditingPassword] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);

  const handleEditPassword = () => {
    setEditingPassword(true);
    setEditingEmail(false); // 다른 입력 버튼들의 상태를 false로 변경
  };

  const handleCancelEditPassword = () => {
    setEditingPassword(false);
  };

  const handleConfirmEditPassword = () => {
    setEditingPassword(false);
  };

  const handleEditEmail = () => {
    setEditingEmail(true);
    setEditingPassword(false); // 다른 입력 버튼들의 상태를 false로 변경
  };

  const handleCancelEditEmail = () => {
    setEditingEmail(false);
  };

  const handleConfirmEditEmail = () => {
    setEditingEmail(false);
  };
  return (
    <div className="EditInfo">
      <h2 className="mypage_all_h2">개인정보 수정</h2>
      <div className="line"></div>
      <div className="editinfo_content">
        <table>
          <colgroup style={{ width: 250 }} />
          <colgroup style={{ width: 350 }} />
          <colgroup style={{ width: 350 }} />
          <tbody>
            <tr>
              <th>아이디</th>
              <td>{hiddenInfo.info_id}</td>
              <td>
                <p>아이디는 변경이 불가능합니다.</p>
              </td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td>
                {editingPassword ? (
                  <EditPassword
                    onCancel={handleCancelEditPassword}
                    onConfirm={handleConfirmEditPassword}
                  />
                ) : (
                  <div>{hiddenInfo.info_pw}</div>
                )}
              </td>
              <td>
                {!editingPassword && (
                  <WhiteButton
                    buttonText={"비밀번호 변경"}
                    onClick={handleEditPassword}
                  />
                )}
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                {editingEmail ? (
                  <EditEmail
                    onCancel={handleCancelEditEmail}
                    onConfirm={handleConfirmEditEmail}
                  />
                ) : (
                  <div>{hiddenInfo.info_email}</div>
                )}
              </td>
              <td>
                {!editingEmail && (
                  <WhiteButton
                    buttonText={"이메일 변경"}
                    onClick={handleEditEmail}
                  />
                )}
              </td>
            </tr>
            <tr>
              <th>이름</th>
              <td>{hiddenInfo.info_name}</td>
              <td>
                <p>이름은 변경이 불가능합니다.</p>
              </td>
            </tr>
            <tr>
              <th>성별</th>
              <td>{hiddenInfo.info_male}</td>
              <td>
                <p>성별은 변경이 불가능합니다.</p>
              </td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td>{hiddenInfo.info_birth}</td>
              <td>
                <p>생년월일은 변경이 불가능합니다.</p>
              </td>
            </tr>
            <tr>
              <th>배송지</th>
              <td>{}</td>
              <td>
                <WhiteButton
                  buttonText={"배송지 변경"}
                  onClick={goToDelivery}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Privacy;
