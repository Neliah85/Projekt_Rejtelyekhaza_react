import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); 

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5001/api/login", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("teamName", response.data.teamName);
            localStorage.setItem("teamId", response.data.teamId);

            setError("");
            setSuccessMessage("Sikeres bejelentkezés!"); 

            
            setTimeout(() => {
                setSuccessMessage("");
                navigate("/");
            }, 2000);
        } catch (error) {
            console.error("Hiba a bejelentkezés során:", error);
            setError(error.response?.data?.error || "Hiba történt a bejelentkezés során.");
        }
    };

    return (
        <>
            <Header />
            <main className="auth-container">
                <h2>Belépés</h2>
                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>} {/* ✅ Üzenet megjelenítése */}

                <form onSubmit={handleLogin}>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

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
