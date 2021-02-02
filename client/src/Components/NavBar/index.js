import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from './HomeIcon.png';
import PieChartIcon from './PieChartIcon.png';
import RecipeIcon from './RecipeIcon.png';
import StatisticsIcon from './StatisticsIcon.png';
// import './style.css'

    const NavBar = ({ isLoggedIn, logout }) => {
    return (
        <nav className='navbar'>
            { !isLoggedIn ?
                <>
                </>
                :
                <>
            <h2 id="idealMeTitle">idealMe</h2>
            <div className='navOptions'>
                <NavLink className= "image" to ='/Home' activeclassName="current">
                 <img src={HomeIcon} className='icon' alt="Home" /> </NavLink>
                <NavLink to='/Userdetails' className='image' activeClassName='current'>
                <img src={StatisticsIcon} className='icon' alt="Stats" />  
                 </NavLink>
                <NavLink to='/Calories' className='image' activeClassName='current'>
                <img src={PieChartIcon} className='icon' alt="Calorie-Counter" /></NavLink>
                <NavLink to='/recipe' className='image' activeClassName='current'>
                <img src={RecipeIcon} className='icon' alt="Recipes" /> 
                </NavLink>
                </div>
                <button id="logoutbtn" onClick={logout}>Logout</button>
                </>
            }
        </nav>
    );
}


export default NavBar;