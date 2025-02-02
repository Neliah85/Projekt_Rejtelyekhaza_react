import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Login = () => {
    return (
        <>
            <Header />
            <main className="auth-container">
                <h2>Belépés</h2>
                <form>
                    <label>Email:</label>
                    <input type="email" required />

                    <label>Jelszó:</label>
                    <input type="password" required />

                    <button type="submit">Belépés</button>
                </form>
            </main>
            <Footer />
        </>
    );
};

export default Login;
