import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [teamName, setTeamName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/.test(email);
    const validatePhone = (phone) => /^(?:\+36|06)[\s-]?(?:1|20|30|31|32|50|70|90)[\s-]?\d{3}[\s-]?\d{4}$/.test(phone);
    const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!=\-;.,]).{6,}$/.test(password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (!validateEmail(email)) {
            setEmailError("Az email formátuma érvénytelen! Pl.: valaki@example.com");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (!validatePhone(phone)) {
            setPhoneError("A telefonszám nem megfelelő! Pl.: +36 30 123 4567 vagy 06 1 234 5678");
            isValid = false;
        } else {
            setPhoneError("");
        }

        if (!validatePassword(password)) {
            setPasswordError("A jelszónak legalább 6 karakter hosszúnak kell lennie, tartalmaznia kell kis- és nagybetűt, számot és egy speciális karaktert (!=-;.,)");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("A két jelszó nem egyezik meg!");
            isValid = false;
        } else {
            setConfirmPasswordError("");
        }

        if (isValid) {
            try {
                const response = await axios.post("http://localhost:5001/api/register", {
                    teamName,
                    captainName: username,
                    email,
                    phone,
                    password
                });

                setSuccessMessage(response.data.message);
                setError("");
                setFormSubmitted(true);
                setTimeout(() => {
                    setFormSubmitted(false);
                    navigate("/login");
                }, 2000);

                // Mezők ürítése
                setUsername("");
                setTeamName("");
                setEmail("");
                setPhone("");
                setPassword("");
                setConfirmPassword("");

            } catch (error) {
                console.error("Hiba a regisztráció során:", error);
                setError(error.response?.data?.error || "Hiba történt a regisztráció során.");
            }
        }
    };

    return (
        <>
            <Header />
            <main className="auth-container">
                <h2>Regisztráció</h2>
                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <label>Felhasználónév:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

                    <label>Csapatnév:</label>
                    <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} required />

                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value.toLowerCase())} required />
                    {emailError && <p className="error">{emailError}</p>}

                    <label>Telefonszám:</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    {phoneError && <p className="error">{phoneError}</p>}

                    <label>Jelszó:</label>
                    <div className="password-wrapper">
                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    {passwordError && <p className="error">{passwordError}</p>}

                    <label>Jelszó megerősítése:</label>
                    <div className="password-wrapper">
                        <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        <button type="button" className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}

                    <button type="submit">Regisztráció</button>
                </form>

                {formSubmitted && (
                    <div className="popup">
                        <p>Sikeres regisztráció!</p>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
};

export default Register;
