import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png"; 

const Header = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const adminToken = localStorage.getItem("adminToken");
        if (adminToken) {
            setIsAdmin(true);
        }
    }, []);

    return (
        <header className="header">
            <nav className="nav-container">
                <Link to="/">
                    <img src={logo} alt="Rejtélyek Háza Logó" className="logo" />
                </Link>
                <ul className="menu">
                    <li><Link to="/" className="menu-button">Főoldal</Link></li>
                    <li><Link to="/about" className="menu-button">Rólunk</Link></li>
                    <li><Link to="/tracks" className="menu-button">Pályák és foglalás</Link></li>
                    <li><Link to="/prices" className="menu-button">Árak</Link></li>
                    <li><Link to="/reviews" className="menu-button">Vélemények</Link></li>
                    <li><Link to="/faq" className="menu-button">Gyakran Ismételt Kérdések</Link></li>
                    <li><Link to="/contact" className="menu-button">Kapcsolat</Link></li>
                    <li><Link to="/gallery" className="menu-button">Galéria</Link></li>

                    {/* Admin menüpont csak bejelentkezett adminnak */}
                    {isAdmin && <li><Link to="/admin" className="menu-button">Admin</Link></li>}
                </ul>
            </nav>

            {/* Belépés és Regisztráció gombok */}
            <div className="auth-buttons">
                <Link to="/login" className="login-button">Belépés</Link>
                <Link to="/register" className="register-button">Regisztráció</Link>
            </div>
        </header>
    );
};

export default Header;
