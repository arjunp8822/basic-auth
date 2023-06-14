import React, { useEffect, useState } from "react";
import "./RecipePage.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const RecipePage = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:4000/recipes/${id}`);
      setRecipe(response.data);
    };
    fetchData();
  }, []);

  return (
    <section>
      <div className="container">
        {recipe.title}
        {recipe.author}
        {recipe.time}
        {recipe.cover}
        {recipe.createdAt}
        {recipe.summary}
        {recipe.content}
      </div>
    </section>
  );
};

export default RecipePage;
