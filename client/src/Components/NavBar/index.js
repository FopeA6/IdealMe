import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';
import home from './Homeicon.png';
import piechart from './PieChartIcon.png';
import recipeIcon from './RecipeIcon.png';
import statisticsIcon from './StatisticsIcon.png';

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

    const iconStyle = {
        width: "30px",
        height: "30px"
    }

    const closeLog = () =>{
        openMenu();
        logout();
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
                        <NavLink to='/calories'  className='nav' activeClassName='current' onClick={()=>openMenu()}>
                            <img src={piechart} style={iconStyle}/>
                            <p className="linkText">Calories</p>
                        </NavLink>
                        <NavLink to='/details' className='nav' activeClassName='current' onClick={()=>openMenu()}>
                            <img src={statisticsIcon} style={iconStyle}/>
                            <p className="linkText">Details</p>
                        </NavLink>
                        <NavLink to='/progress' className='nav' activeClassName='current' onClick={()=>openMenu()}>
                            <img src={statisticsIcon} style={iconStyle}/>
                            <p className="linkText">Progress</p>
                        </NavLink>
                        <NavLink to='/recipe' className='nav' activeClassName='current' onClick={()=>openMenu()}>
                            <img src={recipeIcon} style={iconStyle}/>
                            <p className="linkText">Recipe</p>
                        </NavLink>
                        <button id="logoutbtn" onClick={closeLog}>Logout</button>
                    </div>
                </div>
            }
        </nav>
    );
}


export default NavBar;