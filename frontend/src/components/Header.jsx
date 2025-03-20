import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isCollege, setIsCollege] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setIsCollege(false);
        navigate("/");
    };

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
                    <li><Link to="/faq" className="menu-button">GYIK</Link></li>
                    <li><Link to="/contact" className="menu-button">Kapcsolat</Link></li>
                    <li><Link to="/gallery" className="menu-button">Galéria</Link></li>
                    <li><Link to="/privacy" className="menu-button">Adatvédelmi szabályzat</Link></li>
                    {isLoggedIn && <li><Link to="/profile" className="menu-button">Profil</Link></li>}
                    {isAdmin && <li><Link to="/admin" className="menu-button">Admin</Link></li>}
                    {isCollege && <li><Link to="/college" className="menu-button">Főoldal</Link></li>}
                </ul>
            </nav>

            <div className="auth-buttons">
                {isLoggedIn ? (
                    <>
                        <Link to="/profile" className="profile-link">Profil</Link>
                        <button onClick={handleLogout} className="logout-button">Kijelentkezés</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="login-button">Belépés</Link>
                        <Link to="/register" className="register-button">Regisztráció</Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;