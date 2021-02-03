import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css'

    const NavBar = ({ isLoggedIn, logout }) => {
    return (
        <nav className='navbar'>
            { !isLoggedIn ?
                <>
                </>
                :
                <>
            <h2 id="idealMeTitle">idealMe</h2>
                <NavLink to='/calories' className='nav' activeClassName='current'>Calories</NavLink>
                <NavLink to='/details' className='nav' activeClassName='current'>Details</NavLink>
                <NavLink to='/progress' className='nav' activeClassName='current'>Progress</NavLink>
                <NavLink to='/recipe' className='nav' activeClassName='current'>Recipe</NavLink>
                <button id="logoutbtn" onClick={logout}>Logout</button>
                </>
            }
        </nav>
    );
}


export default NavBar;