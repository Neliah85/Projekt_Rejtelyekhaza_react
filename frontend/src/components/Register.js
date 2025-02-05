import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Register = () => {
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

    
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/.test(email);

    
    const validatePhone = (phone) => /^(?:\+36|06)[\s-]?(?:1|20|30|31|32|50|70|90)[\s-]?\d{3}[\s-]?\d{4}$/.test(phone);

    
    const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!=\-;.,]).{6,}$/.test(password);

    const handleSubmit = (e) => {
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
            setFormSubmitted(true);
            setTimeout(() => setFormSubmitted(false), 3000);
            setUsername("");
            setTeamName("");
            setEmail("");
            setPhone("");
            setPassword("");
            setConfirmPassword("");
        }
    };

    return (
        <>
            <Header />
            <main className="auth-container">
                <h2>Regisztráció</h2>
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
                        <input 
                            type={showPassword ? "text" : "password"} 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    {passwordError && <p className="error">{passwordError}</p>}

                    <label>Jelszó megerősítése:</label>
                    <div className="password-wrapper">
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                        />
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
