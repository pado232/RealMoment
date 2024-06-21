import React, { useEffect, useState } from "react";
import BestItem from "../Components/BestItem";
import Container from "../util/Container";
import "../styles/Home.css";
import HomeMainImg from "../Components/HomeMainImg";
import BackgroundImage from "../Components/BackgroundImage";
import axiosInstanceWithoutAuth from "../api/AxioxInstanceWithoutAuth";

const Home = () => {
  const [homeImgs, setHomeImgs] = useState([]);
  const [homeBackground, setHomeBackground] = useState([]);

  const fetchHomeImg = () => {
    const param = "홍보";
    axiosInstanceWithoutAuth
      .get(`/image?imageLocation=${param}`)
      .then((res) => {
        const imgData = res.data.imageListResponse;
        const filteredImgs = imgData.filter((img) => img.show);
        setHomeImgs(filteredImgs);
        console.log("fetchHomeImg GET", res);
      })
      .catch((error) => {
        console.log("fetchHomeImg Error", error);
      });
  };

  const fetchHomeBackground = () => {
    const param = "배경";
    axiosInstanceWithoutAuth
      .get(`/image?imageLocation=${param}`)
      .then((res) => {
        const imgData = res.data.imageListResponse;
        const filteredImgs = imgData.filter((img) => img.show);
        setHomeBackground(filteredImgs);
        console.log("fetchHomeBackground GET", res);
      })
      .catch((error) => {
        console.log("fetchHomeBackground Error", error);
      });
  };

  useEffect(() => {
    fetchHomeImg();
    fetchHomeBackground();
  }, []);

  return (
    <div className="Home">
      <div style={{ marginTop: 162 }}></div>
      {homeBackground.length > 0 && (
        <BackgroundImage imageUrl={homeBackground[0].imgUrl} />
      )}
      <HomeMainImg homeImgs={homeImgs} />
      <Container>
        <div>
          <h2>BEST ITEM</h2>
          <BestItem />
        </div>
      </Container>
    </div>
  );
};

export default Home;
