import React, { useEffect, useState } from "react";
import "./RecipePage.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlineClockCircle } from "react-icons/ai";

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
      <div className="container recipe-container">
        <h1>{recipe.title}</h1>
        <div className="recipe-details">
          <p>By {recipe.author}</p>
          <div className="recipe-time">
            <AiOutlineClockCircle />
            <p>{recipe.time} mins</p>
          </div>
        </div>
        <h3>{recipe.summary}</h3>
        <div className="nutrition-container">
          <div className="nutrition-block">
            <div className="nutrition-block-number">
              <h6>500</h6>
            </div>
            <div className="nutrition-block-text">
              <h5>Calories</h5>
              <p>Kcal</p>
            </div>
          </div>

          <div className="nutrition-block">
            <div className="nutrition-block-number">
              <h6>250</h6>
            </div>
            <div className="nutrition-block-text">
              <h5>Carbs</h5>
              <p>Grams</p>
            </div>
          </div>

          <div className="nutrition-block">
            <div className="nutrition-block-number">
              <h6>40</h6>
            </div>
            <div className="nutrition-block-text">
              <h5>Protein</h5>
              <p>Grams</p>
            </div>
          </div>

          <div className="nutrition-block">
            <div className="nutrition-block-number">
              <h6>20</h6>
            </div>
            <div className="nutrition-block-text">
              <h5>Fat</h5>
              <p>Grams</p>
            </div>
          </div>
        </div>
        <img src={`http://localhost:4000/${recipe.cover}`} alt={recipe.title} />
        <h2>Ingredients</h2>
        <h2>Recipe</h2>
        <div
          className="recipe-content"
          dangerouslySetInnerHTML={{ __html: recipe.content }}
        ></div>
      </div>
    </section>
  );
};

export default RecipePage;
