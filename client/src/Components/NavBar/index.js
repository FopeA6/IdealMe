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
                   <img className="apple" src="https://iconfair.com/wp-content/uploads/2020/11/Artboard-23-4.png"></img> 
                    <h2 id="idealMeTitle">idealMe</h2>
                    <h2 className="menuIcon" onClick={()=>openMenu()}>☰</h2>
                    </div>
                    <div className="myLinks" style={showStyle}>
                        <NavLink to='/calories' className='nav' activeClassName='current' onClick={()=>openMenu()}> <i className="fas fa-chart-pie"></i>Calories</NavLink>
                        <NavLink to='/details' className='nav' activeClassName='current' onClick={()=>openMenu()}> <i className="fas fa-address-card"></i>Details</NavLink>
                        <NavLink to='/progress' className='nav' activeClassName='current' onClick={()=>openMenu()}> <i className="fas fa-chart-area"></i>Progress</NavLink>
                        <NavLink to='/recipe' className='nav' activeClassName='current' onClick={()=>openMenu()}> <i className="fas fa-utensils"></i>Recipe</NavLink>
                        <button id="logoutbtn" onClick={logout}> <i className="fas fa-power-off"></i>Logout</button>
                    </div>
                </div>
            }
        </nav>
    );
}


export default NavBar;