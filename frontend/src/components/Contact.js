import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
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

        if (isValid) {
            setFormSubmitted(true);
            setTimeout(() => setFormSubmitted(false), 3000);
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
        }
    };

    return (
        <>
            <Header />
            <main className="contact-container">
                <section className="contact-info">
                    <h1>Kapcsolat</h1>
                    <p><strong>Cégnév:</strong> BKÁJZSMT Kft.</p>
                    <p><strong>Cím:</strong> Miskolc, Palóczy László utca 3, 3525</p>
                    <p><strong>Telefonszám:</strong> <a href="tel:+36123456789">+36 12 345 6789</a></p>
                    <p><strong>Email:</strong> <a href="mailto:info@szabaduloszoba.hu">info@szabaduloszoba.hu</a></p>
                </section>

                <section className="contact-form">
                    <h2>Írj nekünk!</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Név:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                        <label>Email:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value.toLowerCase())} 
                            required 
                        />
                        {emailError && <p className="error">{emailError}</p>}

                        <label>Telefonszám:</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        {phoneError && <p className="error">{phoneError}</p>}

                        <label>Üzenet:</label>
                        <textarea rows="5" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>

                        <button type="submit">Elküld</button>
                    </form>

                    {formSubmitted && (
                        <div className="popup">
                            <p>Üzenetedet megkaptuk! Hamarosan válaszolunk.</p>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Contact;
