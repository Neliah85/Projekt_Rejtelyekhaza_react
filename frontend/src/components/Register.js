import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Register = () => {
    const [username, setUsername] = useState("");
    const [teamname, setTeamname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Email validáció
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/;
        return emailRegex.test(email);
    };

    // Magyar telefonszám validáció
    const validatePhone = (phone) => {
        const phoneRegex = /^(?:\+36|06)[\s-]?(?:1|20|30|31|32|50|70|90)[\s-]?\d{3}[\s-]?\d{4}$/;
        return phoneRegex.test(phone);
    };

    // Jelszó validáció (minimum 6 karakter, kis- és nagybetű, szám, speciális karakter (!=-;.,))
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!=\-;.,]).{6,}$/;
        return passwordRegex.test(password);
    };

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

        if (isValid) {
            setFormSubmitted(true);
            setTimeout(() => setFormSubmitted(false), 3000);
            setUsername("");
            setTeamname("");
            setEmail("");
            setPhone("");
            setPassword("");
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
                    <input type="text" value={teamname} onChange={(e) => setTeamname(e.target.value)} required />

                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value.toLowerCase())} required />
                    {emailError && <p className="error">{emailError}</p>}

                    <label>Telefonszám:</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    {phoneError && <p className="error">{phoneError}</p>}

                    <label>Jelszó:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {passwordError && <p className="error">{passwordError}</p>}

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
