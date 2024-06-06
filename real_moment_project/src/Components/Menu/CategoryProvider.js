import React, { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("전체");

  const handleCategoryChange = (categoryId, categoryName) => {
    setSelectedCategory(categoryId);
    setSelectedCategoryName(categoryName);
  };

  return (
    <CategoryContext.Provider
      value={{ selectedCategory, selectedCategoryName, handleCategoryChange }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
