import React from "react";
import './style.css';

const Recipe = ({ title, image, calories, ingredients, preparation, url }) => {
  return (
    <div id="recipecard">
      <div className="infoDivide">
        <h1>{title}</h1>
        <img src={image} alt="pic of recipe" />
      </div>
      <div className="infoDivide">
        <ol>
          {ingredients.map((ingredient, idx) => (
           <li key={idx}>{ingredient.text}</li> 
          ))}
        </ol>
        <p>Calories: {calories}</p>
        {/* <p>{preparation}</p> */}
        <a href={url} target="_blank"> Hungry? Go to the recipe </a>
      </div>
    </div>
  );
};

export default Recipe;
