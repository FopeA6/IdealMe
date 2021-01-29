import React from 'react';
import { Link } from 'react-router-dom';


const Recipe = ({title,calories,image, ingredients,preparation, url}) => {
    return(
        <div>
            <h1>{title}</h1>
            <ol>
                {ingredients.map(ingredient =>(
                    <li>{ingredient.text}</li>
                ))}
            </ol>
            <p>{calories}</p>
            {/* <p>{preparation}</p>
            <Link to={url}>Recipe</Link> */}
            <img src={image} alt=""/>
            
        </div>
    );
}

export default Recipe;