import React, { useEffect, useState } from "react";
import RecipeCard from "../../Components/RecipeCard";

const Recipe = () => {
  // key = process.env.API_KEY;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <h1> What do you want to eat? </h1>
      <h2>Enter a craving and we will give you some meal suggestions</h2>
      <div className="container">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
          placeholder="E.g. Banana"
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      </div>
      <div className="recipe">
      {recipes.map((recipe, idx) => (
        <RecipeCard
          key={idx}
          title={recipe.recipe.label}
          image={recipe.recipe.image}
          calories={Math.round(recipe.recipe.calories)}
          ingredients={recipe.recipe.ingredients}
          // preparation={recipe.recipe.preparation}
          url={recipe.recipe.url}
        />
      ))}
      </div>
    </div>
  );
};

export default Recipe;
