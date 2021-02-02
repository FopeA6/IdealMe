import React, {useEffect, useState} from 'react';


const App =() => {
 
  const [calorieData, setCalories] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('')

useEffect( () => {
  getCalories();
}, [query])

const getCalories = async () => {
  const response= await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, { method: "GET", headers: {'X-Api-Key': process.env.YOUR_API_KEY}
})
const data = await response.json();
}

const updateSearch = e => {
  setSearch(e.target.value);
}

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
}

const renderCalories = calorieData.map((p, idx) =>   
<div key={idx}>
  <h1>Your food has the following nutritional value:</h1>
<p>Name: {p.name}</p>
<p>Total calories: {p.calories}</p>
<p>Carbohydrates: {p.carbohydrates_total_g} g</p>
<p>Protein: {p.protein_g} g</p>
<p>Fat: {p.fat_total_g} g</p>
<p>Serving size: {p.serving_size_g} g</p>
</div>
)

return (
  <div className="App">
      <h1>What did you eat?</h1>
      <p>Enter the food you had her and we tell you how much calories you had.</p>
  <form className= "search-form" onSubmit={getSearch}>
    <input className="search-bar" value={search} onChange={updateSearch} type="text"/>
    <button className="search-button" type="submit">Search</button>

  </form>
  <div className="calorie-container">
      <p className="info-item">{renderCalories}</p>
     
    </div>
  </div>
)
}
export default App;


// calories: 126.7
// carbohydrates_total_g: 28.6
// cholesterol_mg: 0
// fat_saturated_g: 0.1
// fat_total_g: 0.5
// fiber_g: 4
// name: "onion"
// potassium_mg: 99
// protein_g: 3.9
// serving_size_g: 283.495
// sodium_mg: 8
// sugar_g: 13.3
