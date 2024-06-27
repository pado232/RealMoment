import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstanceWithoutAuth from "../../api/AxioxInstanceWithoutAuth";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("전체");
  const [categories, setCategories] = useState([]);

  const handleCategoryChange = (categoryId, categoryName) => {
    setSelectedCategory(categoryId);
    setSelectedCategoryName(categoryName);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstanceWithoutAuth.get(`/category`);
        const data = res.data;
        setCategories(data);
      } catch (error) {
        console.error("Category GET Error:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        selectedCategoryName,
        handleCategoryChange,
        categories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
