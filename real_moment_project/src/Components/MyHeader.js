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
import axios from "axios";

const MyHeader = ({ isLoggedIn, onLogout }) => {
  const [homeLogos, setHomeLogos] = useState([]);
  const navigate = useNavigate();

  const { setSearchTerm } = useSearch();

  const [searchValue, setSearchValue] = useState("");

  const searchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleToggle = () => {
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
    axios
      .get(`http://localhost:8080/image?imageLocation=${param}`)
      .then((res) => {
        const imgData = res.data.imageListResponse;
        setHomeLogos(imgData);
        console.log("fetchHomeLogo GET", res);
      })
      .catch((error) => {
        console.log("fetchHomeLogo Error", error);
      });
  };

  useEffect(() => {
    fetchHomeLogo();
  }, []);

  // useEffect = (() => {}, [selectedCategory, selectedCategoryName]);

  return (
    <header className="MyHeader">
      <div className="head_title">
        <h1>
          <a href={"/"}>
            {homeLogos.map((img, index) => (
              <div key={index}>
                <img src={img.imgUrl} alt={`logo ${index + 1}`} />
              </div>
            ))}
            {/* <img
              alt="logo"
              src={process.env.PUBLIC_URL + `/image/RealMonentLogo.png`}
            /> */}
          </a>
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
            // onBlur={handleBlur}
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
                <a href={"/"} onClick={handleToggle}>
                  <TbLogout2 size={28} />
                  Logout
                </a>
              </div>
            ) : (
              <div className="logout">
                <a href={"/login"} onClick={handleToggle}>
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
