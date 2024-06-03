import { useEffect, useState } from "react";

import EditPassword from "./EditPassword";
import EditEmail from "./EditEmail";
import WhiteButton from "../../util/Buttons/WhiteButton";
import axiosInstance from "../../api/AxiosInstance";
import { getCookie } from "../../api/Cookies";

import "../../styles/Privacy.css";

const Privacy = ({ goToDelivery }) => {
  const [editingPassword, setEditingPassword] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);

  const [hiddenInfo, setHiddenInfo] = useState({});
  const [address, setAddress] = useState({});

  const fetchProfile = () => {
    axiosInstance
      .get(`/member/${getCookie("Id")}/profile`)
      .then((res) => {
        const profileData = res.data;
        setHiddenInfo(hideSensitiveInfo(profileData));
        console.log("fetchProfile GET ", res);
      })
      .catch((error) => {
        console.error("fetchProfile GET Error:", error);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchAddress = () => {
    axiosInstance
      .get(`/member/${getCookie("Id")}/address`)
      .then((res) => {
        const addressData = res.data;
        // setProfile(profileData);
        setAddress(addressData);
        console.log("fetchAddress GET ", res);
      })
      .catch((error) => {
        console.error("fetchAddress GET Error:", error);
      });
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const handleEditPassword = () => {
    setEditingPassword(true);
    setEditingEmail(false);
  };

  const handleCancelEditPassword = () => {
    setEditingPassword(false);
  };

  const handleConfirmEditPassword = () => {
    fetchProfile();
    setEditingPassword(false);
  };

  const handleEditEmail = () => {
    setEditingEmail(true);
    setEditingPassword(false);
  };

  const handleCancelEditEmail = () => {
    setEditingEmail(false);
  };

  const handleConfirmEditEmail = () => {
    fetchProfile();
    setEditingEmail(false);
  };

  const hideSensitiveInfo = (profile) => {
    const hiddenInfo = { ...profile };

    // 아이디의 가운데 5자리를 *로 숨김
    if (profile.loginId) {
      const idLength = profile.loginId.length;
      const maskedId =
        profile.loginId.substring(0, idLength / 2 - 1) +
        "*".repeat(4) +
        profile.loginId.substring(idLength / 2 + 3);
      hiddenInfo.loginId = maskedId;
    }

    // 이름을 숨김
    if (profile.name) {
      const nameLength = profile.name.length;
      if (nameLength === 2) {
        hiddenInfo.name =
          profile.name.substring(0, 1) + "*" + profile.name.substring(1);
      } else if (nameLength % 2 === 1) {
        const middleIndex = Math.floor(nameLength / 2);
        hiddenInfo.name =
          profile.name.substring(0, middleIndex) +
          "*" +
          profile.name.substring(middleIndex + 1);
      } else {
        const middleIndex = nameLength / 2;
        hiddenInfo.name =
          profile.name.substring(0, middleIndex - 1) +
          "**" +
          profile.name.substring(middleIndex + 1);
      }
    }

    // 이메일 절반을 *로 숨김
    if (profile.email) {
      const atIndex = profile.email.indexOf("@");
      if (atIndex !== -1) {
        const beforeAt = profile.email.substring(0, atIndex);
        const afterAt = profile.email.substring(atIndex);

        // beforeAt의 절반을 가림
        const maskLength = Math.ceil(beforeAt.length / 2);
        const maskedEmail =
          beforeAt.substring(0, beforeAt.length - maskLength) +
          "*".repeat(maskLength) +
          afterAt;

        hiddenInfo.email = maskedEmail;
      }
    }

    // 생년월일을 숨김
    if (profile.birthDate) {
      const birthParts = profile.birthDate.split("-");
      if (birthParts.length === 3) {
        const year = birthParts[0];
        const month = birthParts[1];
        const day = birthParts[2];
        const hiddenMonth = "*".repeat(month.length);
        const hiddenDay = "*".repeat(day.length);
        hiddenInfo.birthDate = `${year}년 ${hiddenMonth}월 ${hiddenDay}일`;
      }
    }

    // 가입일을 한국어 형식으로 변환
    if (profile.createdDate) {
      const createdDateParts = new Date(profile.createdDate)
        .toISOString()
        .split("T")[0];
      const hangulDate = createdDateParts.split("-");
      const year = hangulDate[0];
      const month = hangulDate[1];
      const day = hangulDate[2];
      hiddenInfo.createdDate = `${year}년 ${month}월 ${day}일`;
    }

    return hiddenInfo;
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
              <td>{hiddenInfo.loginId}</td>
              <td></td>
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
                  <div>*******</div>
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
                  <div>{hiddenInfo.email}</div>
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
              <td>{hiddenInfo.name}</td>
              <td></td>
            </tr>
            <tr>
              <th>성별</th>
              <td>{hiddenInfo.gender}자</td>
              <td></td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td>{hiddenInfo.birthDate}</td>
              <td></td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>{hiddenInfo.tel}</td>
              <td></td>
            </tr>
            <tr>
              <th>가입일</th>
              <td>{hiddenInfo.createdDate}</td>
              <td></td>
            </tr>
            <tr>
              <th>배송지</th>
              <td>
                {address.mainAddress ? (
                  <div>
                    {`[${address.zipCode}] ${address.mainAddress}, ${address.detAddress}`}
                  </div>
                ) : (
                  <div style={{ color: "#999", fontSize: 13 }}>
                    기본 배송지를 설정해주세요.
                  </div>
                )}
              </td>
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
