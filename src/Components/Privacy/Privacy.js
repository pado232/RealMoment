import { useEffect, useState } from "react";

import EditPassword from "./EditPassword";
import EditEmail from "./EditEmail";
import WhiteButton from "../../util/Buttons/WhiteButton";
import axiosInstance from "../../api/AxiosInstance";
import { getCookie } from "../../api/Cookies";
import hideSensitiveInfo from "../../util/HideSensitiveInfo";

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
