import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const saltResponse = await axios.post(`http://localhost:5000/Login/GetSalt/${username}`);
            const salt = saltResponse.data;

            const saltedPassword = hashPasswordWithSalt(password, salt);

            const loginResponse = await axios.post("http://localhost:5000/Login", {
                LoginName: username, 
                TmpHash: saltedPassword,
            });

            localStorage.setItem("token", loginResponse.data.token);
            localStorage.setItem("realName", loginResponse.data.realName);
            localStorage.setItem("teamId", loginResponse.data.teamId);

            setError("");
            setSuccessMessage("Sikeres bejelentkezés!");

            setTimeout(() => {
                setSuccessMessage("");
                navigate("/");
            }, 2000);
        } catch (error) {
            console.error("Hiba a bejelentkezés során:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message); 
            } else {
                setError("Hiba történt a bejelentkezés során.");
            }
        }
    };

    function hashPasswordWithSalt(password, salt) {
        return password + salt; 
    }

    return (
        <>
            <Header />
            <main className="auth-container">
                <h2>Belépés</h2>
                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}

                <form onSubmit={handleLogin}>
                    <label>Felhasználónév:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

                    <label>Jelszó:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <button type="submit">Belépés</button>
                </form>
            </main>
            <Footer />
        </>
    );
};

export default Login;