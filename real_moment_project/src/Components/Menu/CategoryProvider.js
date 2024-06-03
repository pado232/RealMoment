import React, { createContext, useContext, useEffect, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  const handleCategoryChange = (categoryId, categoryName) => {
    setSelectedCategory(categoryId);
    setSelectedCategoryName(categoryName);
  };

  //   useEffect(() => {
  //     handleCategoryChange();
  //   }, [selectedCategory, selectedCategoryName]);

  return (
    <CategoryContext.Provider
      value={{ selectedCategory, selectedCategoryName, handleCategoryChange }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
