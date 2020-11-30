import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Hader.css';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to="/Shop">Shop</Link>
                <Link to="/Review">Rview</Link>
                <Link to="Inventory">Manage Inventory</Link>
                <button onClick={()=> setLoggedInUser({})}>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;