import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";
import { AiOutlineClockCircle } from "react-icons/ai";

const RecipeCard = (props) => {
  return (
    <div className="recipe-card-container">
      <Link to={`/recipes/${props.id}`}>
        <img src={`http://localhost:4000/${props.img}`} alt={props.title} />
      </Link>
      <h3>{props.title}</h3>
      <div className="recipe-card-summary">
        <h5 className="author">By {props.author}</h5>
        <div className="recipe-card-time">
          <AiOutlineClockCircle />
          <h5>{props.time} mins</h5>
        </div>
      </div>
      <p>{props.description}</p>
    </div>
  );
};

export default RecipeCard;
