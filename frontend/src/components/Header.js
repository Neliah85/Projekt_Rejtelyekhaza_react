import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Header = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const adminToken = localStorage.getItem("adminToken");
        const userToken = localStorage.getItem("token");
        const storedTeamName = localStorage.getItem("teamName");
        const storedUsername = localStorage.getItem("username");
       
        if (adminToken) {
            setIsAdmin(true);
        }

        if (userToken) {
            setIsLoggedIn(true);
            setTeamName(storedTeamName);
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("teamName");
        localStorage.removeItem("teamId");
        localStorage.removeItem("adminToken");
        localStorage.removeItem("username");

        setIsLoggedIn(false);
        setIsAdmin(false);
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

                    {/* Admin menüpont csak bejelentkezett adminnak */}
                    {isAdmin && <li><Link to="/admin" className="menu-button">Admin</Link></li>}
                </ul>
            </nav>

            {/* ✅ Ha be van jelentkezve, kijelentkezés gomb jelenik meg */}
            <div className="auth-buttons">
                {isLoggedIn ? (
                    <>
                        <Link to="/profile" className="profile-link">Üdv, {username}!</Link>
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
