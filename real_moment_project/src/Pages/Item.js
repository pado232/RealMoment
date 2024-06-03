import { useCategory } from "../Components/Menu/CategoryProvider";
import Container from "../util/Container";
import ItemList from "../Components/Item/ItemList";

const Item = () => {
  const { selectedCategory, selectedCategoryName } = useCategory();

  return (
    <div className="Item">
      <Container>
        <h2>{selectedCategoryName}</h2>
        <h2>{selectedCategory}</h2>
        {/* <ItemList selectedCategory={selectedCategory} /> */}
      </Container>
    </div>
  );
};

export default Item;
