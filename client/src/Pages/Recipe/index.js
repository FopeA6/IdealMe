import React, { useEffect, useState } from "react";
import RecipeCard from "../../Components/RecipeCard";

const Recipe = () => {
  // key = process.env.API_KEY;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getRecipes();
<<<<<<< HEAD
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

      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          image={recipe.recipe.image}
          calories={Math.round(recipe.recipe.calories)}
          ingredients={recipe.recipe.ingredients}
          // preparation={recipe.recipe.preparation}
          url={recipe.recipe.url}
        />
      ))}
    </div>
  );
};

export default Recipe;
=======
      }, [query]);

        const getRecipes = async () => {
            const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`);
            const data = await response.json();
            setRecipes(data.hits);
            console.log(data.hits)
    }

        const updateSearch = e => {
            setSearch(e.target.value);
        }

        const getSearch = e => {
            e.preventDefault();
            setQuery(search);
            setSearch('');
        }

        return (
            <div className="App">
            <h1> Hello to recipe page! </h1>

            <form onSubmit={getSearch} className="search-form">
                <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
                <button className="search-button" type="submit">Search</button>
            </form>
                {recipes.map((recipe,idx) =><RecipeCard key={idx} 
                        title={recipe.recipe.label} 
                        calories={Math.round(recipe.recipe.calories)} 
                        image={recipe.recipe.image}
                        ingredients={recipe.recipe.ingredients}
                        // preparation={recipe.recipe.preparation}
                        // url={recipe.recipe.url}
                    />
                )}
            </div>
        )
        
    }

export default Recipe;
>>>>>>> 75333c5736103dec6192ff2a07ae6e78978d0c95
