import BestItem from "../Components/BestItem";
import Container from "../util/Container";
import "../styles/Home.css";
import HomeMainImg from "../Components/HomeMainImg";
import { useEffect, useState } from "react";
import axios from "axios";
import TestPage from "../Components/TestPage";

const Home = () => {
  const [homeImgs, setHomeImgs] = useState([]);

  const fetchHomeImg = () => {
    const param = "홍보";
    axios
      .get(`http://localhost:8080/image?imageLocation=${param}`)
      .then((res) => {
        const imgData = res.data.imageListResponse;
        setHomeImgs(imgData);
        console.log("fetchHomeImg GET", res);
      })
      .catch((error) => {
        console.log("fetchHomeImg Error", error);
      });
  };

  useEffect(() => {
    fetchHomeImg();
  }, []);

  return (
    <div className="Home">
      <div style={{ marginTop: 162 }}></div>
      <HomeMainImg homeImgs={homeImgs} />
      <Container>
        <div>
          {/* <TestPage images={homeImgs} /> */}
          <h2>BEST ITEM</h2>
          <BestItem />
        </div>
      </Container>
    </div>
  );
};

export default Home;
