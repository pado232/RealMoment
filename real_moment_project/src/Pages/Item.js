import Container from "../util/Container";
import ItemList from "../Components/Item/ItemList";

const Item = () => {
  return (
    <div className="Item">
      <Container>
        <ItemList />
      </Container>
    </div>
  );
};

export default Item;
