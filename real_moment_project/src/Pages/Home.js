import BestItem from "../Components/BestItem";
import Container from "../util/Container";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="Home">
      <Container>
        <h2>홍보 이미지</h2>

        <div>
          <h2>BEST ITEM</h2>
          <BestItem />
        </div>
      </Container>
    </div>
  );
};

export default Home;
