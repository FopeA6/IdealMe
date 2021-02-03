import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import './style.css'

const NavBar = ({ isLoggedIn, logout }) => {
    const [showStyle, setShowStyle] = useState({
        display: "none"
    });
    const openMenu = () =>{
        if(showStyle.display === "none"){
            setShowStyle({
                display: "flex",
                flexDirection: "column"
            })
        }else{
            setShowStyle({
                display: "none"
            })
        }
    }
    return (
        <nav className='navbar'>
            { !isLoggedIn ?
                <></>
                :
                <div className="topnav">
                    <div className="allShow">
                    <h2 id="idealMeTitle">idealMe</h2>
                    <h2 className="menuIcon" onClick={()=>openMenu()}>☰</h2>
                    </div>
                    <div className="myLinks" style={showStyle}>
                        <NavLink to='/calories' className='nav' activeClassName='current' onClick={()=>openMenu()}>Calories</NavLink>
                        <NavLink to='/details' className='nav' activeClassName='current' onClick={()=>openMenu()}>Details</NavLink>
                        <NavLink to='/progress' className='nav' activeClassName='current' onClick={()=>openMenu()}>Progress</NavLink>
                        <NavLink to='/recipe' className='nav' activeClassName='current' onClick={()=>openMenu()}>Recipe</NavLink>
                        <button id="logoutbtn" onClick={logout}>Logout</button>
                    </div>
                </div>
            }
        </nav>
    );
}


export default NavBar;