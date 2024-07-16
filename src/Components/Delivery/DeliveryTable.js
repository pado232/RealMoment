import React from "react";
import WhiteButton from "../../util/Buttons/WhiteButton";
import axiosInstance from "../../api/AxiosInstance";
import { getCookie } from "../../api/Cookies";

import { HiOutlineHome } from "react-icons/hi";
import { LuBuilding2 } from "react-icons/lu";
import { HiOutlineLocationMarker } from "react-icons/hi";

import "../../styles/Delivery.css";

const DeliveryTable = ({ deliveries, openModalForEdit }) => {
  const onRemove = (addressId) => {
    axiosInstance
      .delete(`/member/${getCookie("Id")}/address?addressId=${addressId}`)
      .then((res) => {
        console.log("DeliveryAddressRemove DELETE ", res);
        window.location.reload(); // 데이터 새로고침
      })
      .catch((error) => {
        console.error("DeliveryAddressRemove DELETE Error:", error);
      });
  };

  const iconSize = 10 * 3;

  return (
    <div className="DeliveryTable">
      <table>
        <colgroup style={{ width: 150 }} />
        <colgroup style={{ width: 120 }} />
        <colgroup style={{ width: 150 }} />
        {/* <colgroup span={2} style={{ width: "auto" }} /> */}
        <colgroup style={{ width: 500 }} />
        <colgroup style={{ width: 220 }} />
        <colgroup style={{ width: 200 }} />
        <thead>
          <tr>
            <th>기본 설정</th>
            <th>아이콘</th>
            <th>받는 사람</th>
            <th>주소</th>
            <th>전화번호</th>
            <th>변경 사항</th>
          </tr>
        </thead>
        <tbody>
          {/** 배송지 리스트를 table로 작성 */}
          {deliveries.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ height: 300 }}>
                <center>
                  <strong>등록된 배송지가 없습니다.</strong>
                </center>
              </td>
            </tr>
          ) : (
            deliveries.map((it, index) => (
              <tr key={index}>
                <td>
                  <div>{it.default ? "기본 배송지" : ""}</div>
                </td>
                <td>
                  <center>
                    <div>
                      {it.location === "집" ? (
                        <HiOutlineHome size={iconSize} />
                      ) : (
                        ""
                      )}
                      {it.location === "회사" && (
                        <LuBuilding2 size={iconSize} />
                      )}
                      {it.location === "기타" && (
                        <HiOutlineLocationMarker size={iconSize} />
                      )}
                    </div>

                    <div style={{ fontSize: 14, color: "#aaa" }}>
                      {it.location}
                    </div>
                  </center>
                </td>
                <td>
                  <div>{it.name}</div>
                </td>
                <td>
                  <div className="address">
                    <div>[ {it.zipCode} ]</div>
                    <div>
                      {it.mainAddress}, {it.detAddress}
                    </div>
                    <div></div>
                  </div>
                </td>
                <td>
                  <div>{it.tel}</div>
                </td>
                <td>
                  <center>
                    <div className="button_warpper">
                      <WhiteButton
                        style={{ marginBottom: 10 }}
                        onClick={() => openModalForEdit(it)}
                        buttonText={"수정하기"}
                      />
                      <WhiteButton
                        onClick={() => onRemove(it.addressId)}
                        buttonText={"삭제하기"}
                      />
                    </div>
                  </center>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryTable;
