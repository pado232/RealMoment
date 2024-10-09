# 🛒 RealMoment Shopping-Mall

#### [RealMement Shopping-Mall 바로가기](https://real-moment.kro.kr/)

</br>

## ❓❗ 쇼핑몰 웹사이트를 선택한 이유

### 기술적 도전과 팀 협업 경험

쇼핑몰 웹 사이트에서 다양한 기술을 통합하고 전반적인 시스템을 이해하기에 적합하다고 판단하여 진행하게 되었습니다.</br>
React 프레임워크를 사용하여 사용자 인터페이스를 개발하고, REST API를 통해 백엔드와의 통신을 구현하면서, 실시간 데이터 처리와 상태 관리를 효율적으로 처리할 수 있는 능력을 키우고자 했습니다.</br>
또한 백엔드와 협업하여 진행하는 만큼, 다양한 웹 애플리케이션 구성요소의 상호작용에 대해 배우고 효율적인 커뮤니케이션 능력을 기르는데 큰 도움이 되었습니다.

</br>

## 📃 웹사이트 설명

사용자가 다양한 제품을 쉽게 쇼핑할 수 있도록 돕는 코스메틱 쇼핑몰 웹사이트입니다.</br>
사용자 친화적인 인터페이스와 백엔드를 통해 상품 검색, 상품 결제, 카트 또는 하트함에 추가 등 효율적인 쇼핑을 위한 동작들을 수행할 수 있도록 제작되었습니다.

</br>

## 📚 **상세 정보**

### 1. 👥 **개발 인원**

- **프론트엔드**: 1명
- **백엔드**: 1명

---

### 2. 🎯 **역할**

- **전체적인 프론트엔드 영역**을 담당하였습니다.

---

### 3. 📅 **프로젝트 일정**

- **2024.01.10 ~ 2024.07.07**
  - **기획**: 1개월
  - **개발**: 6개월
  - **유지보수**: 진행 중

---

### 4. 🛠 **기능의 흐름**

- **데이터 전송방식**: REST API
- **데이터의 형식**: JSON 형식
- **데이터 통신 프로토콜**: HTTP/HTTPS (RESTful API)

---

### 5. 💻 **사용된 기술**

#### **프로그래밍 언어**

- **Javascript**

#### **프레임워크**

- **React**

#### **주요 라이브러리**

- **axios**: HTTP 클라이언트
- **react-cookie**: 쿠키 관리 라이브러리
- **react-datepicker**: 달력 컴포넌트
- **react-daum-postcode**: 카카오 주소 검색 컴포넌트
- **react-icons**: 아이콘 라이브러리
- **react-modal**: 모달 컴포넌트 라이브러리
- **react-router-dom**: 라우팅 라이브러리

---

### 6. 🛠 **개발 도구 및 협업 도구**

#### **통합 개발 환경(IDE)**

- **Visual Studio Code**

#### **버전 관리 및 협업 도구**

- **Git**, **GitHub**

#### **상태 관리**

- **Context API**, **React Router**

#### **스타일링**

- **CSS**

---

</br>

## 🩺 문제점 & 🩹 해결 방안

프로젝트 진행 중 발생한 문제와 해결 방법에 대해 더 자세히 알고 싶다면, [노션 페이지](https://www.notion.so/Shopping-Mall-Project-83cac7f2de6f47b48037173179d5c961)를 참고하세요.

---

</br>

## 📢 주요 기능

|                                                            **화면 구성**                                                             | **주요 기능**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :----------------------------------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     **메인 페이지** ![real-moment kro kr_home](https://github.com/user-attachments/assets/9b57ac4d-a5ed-4d12-81ff-ca74795ce11a)      | • **React로 구현한 슬라이드 쇼**: 상태 관리를 통해 슬라이드 배너 이미지를 동적으로 전환하며, 각 배너는 상품 링크와 연결됨</br> • **실시간 검색 기능**: 사용자가 입력한 검색어를 기반으로 실시간으로 상품 목록을 필터링하여 연관 검색어를 표시함. 입력된 검색어가 `onChange` 이벤트를 통해 업데이트되며, 검색어에 맞는 항목들이 즉시 필터링되어 검색 제안 목록에 표시됨</br> • **헤더**: `position: fixed`를 사용하여 페이지 스크롤에도 상단 고정된 UI를 제공하며, 로그인 상태에 따라 메뉴 변경</br> • **푸터**: 쇼핑몰 정보 및 SNS 링크 제공                                                                                                     |
|           **로그인 페이지** ![Login Page](https://github.com/user-attachments/assets/f160fb25-bd58-456d-8a6d-66545fdd45b8)           | • **폼 유효성 검사**: `React Hook Form`을 사용하여 ID와 비밀번호의 유효성을 검사하고, 오류 메시지를 사용자에게 실시간으로 제공</br> • **쿠키 관리**: `react-cookie` 라이브러리를 활용하여 사용자의 로그인 상태를 관리하며, 자동 로그인 기능을 지원                                                                                                                                                                                                                                                                                                                                                                                               |
|  **회원가입 페이지** ![real-moment kro kr_signup](https://github.com/user-attachments/assets/bece9eb6-9800-4fef-9844-fa24db607e6c)   | • **아이디 중복 확인**: `axios`를 사용하여 비동기적으로 서버와 통신하며, 아이디 중복 여부를 실시간으로 확인</br> • **이메일 인증**: `setInterval`로 인증 타이머를 구현하고, 인증 만료 시 사용자에게 경고 메시지를 표시                                                                                                                                                                                                                                                                                                                                                                                                                           |
|   **상품 목록 페이지** ![real-moment kro kr_item](https://github.com/user-attachments/assets/4060bddc-477a-40bf-ae44-f0e6b3aa6ae4)   | • **상품 필터링**: 카테고리 선택에 따라 `useEffect`를 활용해 필터링된 상품 목록을 서버에서 받아와 화면에 표시</br> • **페이지네이션 구현**: 대량의 데이터를 효율적으로 표시하기 위해 페이지네이션을 적용, 현재 페이지에 해당하는 상품 목록만 불러옴                                                                                                                                                                                                                                                                                                                                                                                              |
| **상품 상세 페이지** ![real-moment kro kr_detail_1](https://github.com/user-attachments/assets/921220a8-aefc-46aa-a540-e727e2c9cc96) | • **상품 상세 정보 및 이미지 슬라이드**: `useParams`를 사용하여 URL에서 `itemId`를 받아오고, `axios`를 통해 서버에서 상품 데이터를 가져와 상세 정보를 `useState`로 관리. 슬라이드 형식의 이미지 및 다양한 상품 정보를 동적으로 렌더링함</br> • **수량 선택 및 장바구니 추가**: 상품 수량을 조절하고, 선택된 수량만큼 장바구니에 담을 수 있으며, 재고 제한에 따라 수량 조정 및 경고 메시지를 출력</br> • **찜하기 기능**: `useState`로 하트 아이콘 상태를 관리하며, 클릭 시 찜한 상품을 추가 또는 삭제</br> • **리뷰 및 Q&A 섹션**: `DetailReview`와 `DetailQandA` 컴포넌트를 통해 리뷰 작성 및 질문 작성 가능. 각 섹션으로 스크롤 이동 기능 제공 |
|   **장바구니 페이지** ![real-moment kro kr_cart](https://github.com/user-attachments/assets/836d5432-e939-4736-a87b-e177ac70012e)    | • **장바구니 목록 조회 및 선택**: `axios`를 통해 서버에서 사용자의 장바구니 목록을 가져오며, 가져온 데이터를 `useState`로 관리. 각 상품의 수량 및 합계 금액을 실시간으로 보여줌</br> • **수량 변경**: 각 상품의 수량을 실시간으로 조정. `axios.patch`를 통해 서버에 수량 변경 사항을 전송</br> • **상품 선택 및 삭제**: 체크박스를 통해 선택한 상품들을 관리하며, 선택된 상품을 한 번에 삭제할 수 있음. `axios.delete`로 서버에서 선택된 항목 삭제</br> • **결제 페이지 이동**: '주문하기' 버튼 클릭 시 선택된 상품 목록과 수량 정보를 `navigate`를 통해 결제 페이지로 전달. 선택된 상품이 없을 경우 경고 메시지를 출력                          |
|  **결제 페이지** ![real-moment kro kr_ordercheck](https://github.com/user-attachments/assets/694ff07b-741d-4a2f-a42d-e4c8308845a0)   | • **주문할 상품 목록 확인 및 가격 계산**: 사용자가 장바구니에서 선택한 상품 목록을 서버로 전달하고, 이를 결제 페이지에서 확인 가능. 각 상품의 합계 금액, 사용 가능한 포인트, 할인 금액 등 결제 정보를 실시간으로 계산하여 화면에 표시</br> • **포인트 사용 및 배송지 설정**: 사용자는 보유한 포인트를 사용하거나 기본 배송지를 선택할 수 있음. 포인트는 사용 가능한 범위 내에서 자동으로 조정되며, 주문할 때 적용 가능</br> • **결제 처리**: '주문하기' 버튼 클릭 시 결제 요청이 서버로 전송되며, 아임포트(IMP) 결제 API를 사용해 결제를 진행. 결제 성공 시 결제 내역 페이지로 이동하며, 실패 시 오류 메시지 표시                                |
|    **찜하기 페이지** ![real-moment kro kr_heart](https://github.com/user-attachments/assets/4dae457f-d768-41f5-8d5b-ed79c3b39407)    | • **찜한 상품 목록 조회**: `axios`를 사용하여 서버에서 사용자의 찜한 상품 목록을 불러와 `useState`로 관리</br> • **페이지네이션 기능**: 사용자가 찜한 상품이 많을 경우 페이지네이션을 통해 데이터를 분리하여 표시. `Pagination` 컴포넌트를 사용하여 현재 페이지 상태를 관리하고, 페이지 이동이 가능함</br> • **하트 아이콘으로 찜하기 취소**: 하트 아이콘을 클릭하면 해당 상품이 찜하기 목록에서 제거되며, 목록은 `axios.delete` 요청을 통해 서버와 동기화됨                                                                                                                                                                                     |
|     **마이페이지** ![real-moment kro kr_mypage](https://github.com/user-attachments/assets/72a73cf4-45f0-409a-900b-84a412cc477b)     | • **주문 내역 확인**: 기간별 조회, 상품명 검색 및 주문 상태에 따른 처리 (구매 확정, 환불 요청 등). 모달을 통해 주문내역에서 리뷰 작성 가능</br> • **사용자 리뷰 관리**: 작성할 리뷰와 작성한 리뷰를 구분하여 관리, 리뷰 수정 및 열람 가능</br> • **멤버십 관리**: 현재 사용자의 등급, 해택, 연간 구매 금액을 각 등급별로 비교하여 보여줌</br> • **적립금 관리**: 적립 내역 조회 및 사용 내역</br> • **1:1 문의 및 Q&A**: 문의 작성 및 조회, 수정/삭제 기능 제공</br> • **배송지 관리**: 배송지 추가, 삭제 및 기본 배송지 설정</br> • **개인정보 수정**: 인증을 통한 안전한 정보 수정                                                             |

</br>
