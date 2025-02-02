import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Contact = () => {
    return (
        <>
            <Header />
            <main>
                <section className="contact-info">
                    <h1>Kapcsolat</h1>
                    <p><strong>Cégnév:</strong> BKÁJZSMT Kft.</p>
                    <p><strong>Cím:</strong> Miskolc, Palóczy László utca 3, 3525</p>
                    <p><strong>Telefonszám:</strong> <a href="tel:+36123456789">+36 12 345 6789</a></p>
                    <p><strong>Email:</strong> <a href="mailto:info@szabaduloszoba.hu">info@szabaduloszoba.hu</a></p>
                </section>

                <section className="contact-form">
                    <h2>Írj nekünk!</h2>
                    <form>
                        <label>Név:</label>
                        <input type="text" required />

                        <label>Email:</label>
                        <input type="email" required />

                        <label>Telefonszám:</label>
                        <input type="tel" required />

                        <label>Üzenet:</label>
                        <textarea rows="5" required></textarea>

                        <button type="submit">Elküld</button>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Contact;
