import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav>
                <ul className="menu">
                    <li><Link to="/">Főoldal</Link></li>
                    <li><Link to="/tracks">Pályák és foglalás</Link></li>
                    <li><Link to="/prices">Árak</Link></li>
                    <li><Link to="/reviews">Vélemények</Link></li>
                    <li><Link to="/faq">Gyakori kérdések</Link></li>
                    <li><Link to="/contact">Kapcsolat</Link></li>
                    <li><Link to="/gallery">Galéria</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
