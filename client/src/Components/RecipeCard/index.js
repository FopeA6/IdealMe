import React from "react";
import './style.css';

const Recipe = ({ title, image, calories, ingredients, preparation, url }) => {
  return (
    <div className="recipeContainer">
      <div>
        <h1>{title}</h1>
        <img src={image} alt="pic of recipe" />
      </div>
      <div>
        <ol>
          {ingredients.map((ingredient) => (
            <li>{ingredient.text}</li>
          ))}
        </ol>
        <p>Calories: {calories}</p>
        {/* <p>{preparation}</p> */}
        <a href={url}> Hungry? Go to the recipe</a>
      </div>
    </div>
  );
};

export default Recipe;
