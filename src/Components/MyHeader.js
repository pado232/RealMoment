import { IoSearch } from "react-icons/io5";
import { MdOutlineContactPage } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { TbLogin2, TbLogout2 } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import "../styles/MyHeader.css";
import { useEffect, useState } from "react";
import { useSearch } from "./Item/SearchProvider";
import { useNavigate } from "react-router-dom";
import axiosInstanceWithoutAuth from "../api/AxioxInstanceWithoutAuth"; // 경로 수정

const MyHeader = ({ isLoggedIn, onLogout }) => {
  const [homeLogos, setHomeLogos] = useState([]);
  const [itemName, setItemName] = useState([]);
  const navigate = useNavigate();
  const { setSearchTerm } = useSearch();
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false); // input이 활성화 되었는지 여부를 관리하는 상태
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // 선택된 항목의 인덱스
  const [filteredItems, setFilteredItems] = useState([]); // 필터링된 항목들

  const searchValueChange = (e) => {
    setSearchValue(e.target.value);
    setHighlightedIndex(-1); // 검색어가 변경되면 선택된 항목 초기화

    // 검색어 변경 시 실시간으로 필터링
    const newFilteredItems = itemName.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredItems(newFilteredItems);
  };

  const handleLogout = () => {
    onLogout();
  };

  // Enter 키 또는 클릭 시 검색을 실행하고 페이지 이동
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (highlightedIndex >= 0 && filteredItems.length > 0) {
        // 검색 제안에서 선택된 항목이 있을 때
        const selectedItem = filteredItems[highlightedIndex];
        setSearchTerm(selectedItem.name);
        setSearchValue(selectedItem.name); // 선택된 항목을 검색어로 설정
      } else if (searchValue.trim() !== "") {
        setSearchTerm(searchValue);
      }
      setIsFocused(false);
      navigate("/item/all");
    } else if (e.key === "ArrowDown") {
      // 화살표 아래 키로 항목 선택
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredItems.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      // 화살표 위 키로 항목 선택
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
  };

  // 검색 제안을 클릭하면 페이지 이동
  const handleSuggestionClick = (item) => {
    setSearchTerm(item.name);
    setSearchValue(item.name); // 선택된 항목을 검색어로 설정
    setIsFocused(false);
    navigate("/item/all");
  };

  const fetchItemName = () => {
    axiosInstanceWithoutAuth
      .get(`/itemNames`)
      .then((res) => {
        const itemNameData = res.data;
        setItemName(itemNameData);
        setFilteredItems(itemNameData); // 처음에는 모든 아이템을 표시
        console.log("아이템 배열", res);
      })
      .catch((error) => {
        console.log("fetchItemName Error", error);
      });
  };

  const fetchHomeLogo = () => {
    const param = "로고";
    axiosInstanceWithoutAuth
      .get(`/image?imageLocation=${param}`)
      .then((res) => {
        const imgData = res.data.imageListResponse;
        const filteredImgs = imgData.filter((img) => img.show);
        setHomeLogos(filteredImgs);
        console.log("로고 이미지 배열", filteredImgs);
        console.log("fetchHomeLogo GET", res);
      })
      .catch((error) => {
        console.log("fetchHomeLogo Error", error);
      });
  };

  useEffect(() => {
    fetchHomeLogo();
    fetchItemName();
  }, []);

  return (
    <header className="MyHeader">
      <div className="head_title">
        {homeLogos.length > 0 ? (
          <div>
            <a href={homeLogos[0].linkUrl}>
              <img className="logo_img" src={homeLogos[0].imgUrl} alt="logo" />
            </a>
          </div>
        ) : (
          <a href="/">No Logo!!</a>
        )}
      </div>
      <div className="head_search">
        <div className="head_search_box">
          <div className="head_search_input_container">
            <button>
              <IoSearch size={28} />
            </button>
            <input
              type="text"
              name="search"
              value={searchValue}
              onChange={searchValueChange}
              placeholder="찾으시는 상품을 입력해주세요."
              onKeyDown={handleSearch} // 키보드 이벤트 처리
              onFocus={() => setIsFocused(true)} // input이 포커스될 때
            />
          </div>
          {isFocused &&
            searchValue.length > 0 && ( // 포커스된 상태일 때만 연관검색어 표시
              <div className="suggestion">
                {filteredItems.map((item, index) => (
                  <div
                    key={index}
                    className={`suggestion_item ${
                      highlightedIndex === index ? "highlighted" : ""
                    }`}
                    onMouseEnter={() => setHighlightedIndex(index)} // 마우스를 올리면 해당 항목 강조
                    onClick={() => handleSuggestionClick(item)} // 검색 제안을 클릭하면 검색 실행
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
      <div className="head_menu">
        <ul>
          <li>
            {isLoggedIn && (
              <a style={{ paddingTop: 4 }} href="/heart">
                <FaRegHeart size={22} style={{ marginBottom: 2 }} />
                Heart
              </a>
            )}
          </li>
          <li>
            {isLoggedIn && (
              <a href="/cart">
                <TiShoppingCart size={28} />
                Cart
              </a>
            )}
          </li>
          <li>
            {isLoggedIn && (
              <a href="/mypage">
                <MdOutlineContactPage size={28} />
                MyPage
              </a>
            )}
          </li>
          <li>
            {isLoggedIn ? (
              <div className="login">
                <a href="/" onClick={handleLogout}>
                  <TbLogout2 size={28} />
                  Logout
                </a>
              </div>
            ) : (
              <div className="logout">
                <a href="/login">
                  <TbLogin2 size={28} />
                  Login
                </a>
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default MyHeader;
