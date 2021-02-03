import React from "react";

const Recipe = ({ title, calories, image, ingredients, preparation, url }) => {
  return (
    <div>
      <h1>{title}</h1>
      <img src={image} alt="pic of recipe" />
      <ol>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ol>
      <p>Calories: {calories}</p>
      {/* <p>{preparation}</p> */}
      <a href={url}> Hungry? Go to the recipe</a>
    </div>
  );
};

export default Recipe;
