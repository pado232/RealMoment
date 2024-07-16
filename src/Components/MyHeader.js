import { IoSearch } from "react-icons/io5";
import { MdOutlineContactPage } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { TbLogin2 } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import "../styles/MyHeader.css";
import { useEffect, useState } from "react";
import { useSearch } from "./Item/SearchProvider";
import { useNavigate } from "react-router-dom";
import axiosInstanceWithoutAuth from "../api/AxioxInstanceWithoutAuth";

const MyHeader = ({ isLoggedIn, onLogout }) => {
  const [homeLogos, setHomeLogos] = useState([]);
  const navigate = useNavigate();
  const { setSearchTerm } = useSearch();
  const [searchValue, setSearchValue] = useState("");

  const searchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleLogout = () => {
    onLogout();
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (searchValue.trim() !== "") {
        setSearchTerm(searchValue);
        e.target.blur();
      } else {
        setSearchTerm("");
        e.target.blur(); // 검색어가 빈 값이면 검색을 초기화합니다.
      }
      navigate("/item/all");
    }
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
  }, []);

  return (
    <header className="MyHeader">
      <div className="head_title">
        <h1>
          {homeLogos.length > 0 ? (
            <div>
              <a href={homeLogos[0].linkUrl}>
                <img src={homeLogos[0].imgUrl} alt={`logo`} />
              </a>
            </div>
          ) : (
            <a href="/">No Logo!!</a>
          )}
        </h1>
      </div>
      <div className="head_search">
        <div className="head_search_box">
          <button>
            <IoSearch size={28} />
          </button>
          <input
            type="text"
            name="search"
            value={searchValue}
            onChange={searchValueChange}
            placeholder="찾으시는 상품을 입력해주세요"
            onKeyDown={handleSearch}
          />
        </div>
      </div>
      <div className="head_menu">
        <ul>
          <li style={{ paddingRight: 7 }}>
            {isLoggedIn ? (
              <a style={{ paddingTop: 4 }} href={"/heart"}>
                <FaRegHeart size={22} style={{ marginBottom: 2 }} />
                Heart
              </a>
            ) : (
              ""
            )}
          </li>
          <li>
            {isLoggedIn ? (
              <a href={"/cart"} style={{ paddingTop: 1 }}>
                <TiShoppingCart size={28} />
                Cart
              </a>
            ) : (
              ""
            )}
          </li>
          <li>
            {isLoggedIn ? (
              <a href={"/mypage"}>
                <MdOutlineContactPage size={28} />
                MyPage
              </a>
            ) : (
              ""
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
                <a href={"/login"}>
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
