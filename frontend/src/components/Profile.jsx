import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Profile = () => {
    const [userData, setUserData] = useState({
        realName: "",
        nickName: "",
        email: "",
        phone: "",
        teamId: null,
    });
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const getUserData = async () => {
            try {
                const userName = localStorage.getItem("username");
                const response = await axios.get(`http://localhost:5000/Users/GetByUserName/${token},${userName}`);
        setUserData({
                    realName: response.data.realName,
                    email: response.data.email,
                    phone: response.data.phone,
                    teamId: response.data.teamId,
                    nickName: response.data.nickName,
                });
            } catch (error) {
                console.error("Hiba a felhasználói adatok lekérésekor:", error);
                navigate("/login");
            }
        };
        getUserData();
    }, [navigate, token, userName]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const updatedData = {
                ...userData,
                password: password || undefined,
            };

            await axios.post(`http://localhost:5000/Users/${token}`, updatedData); // Token a URL-ben
            alert("Profil sikeresen frissítve!");
        } catch (error) {
            console.error("Hiba a profil frissítésekor:", error);
        }
    };

    return (
        <>
            <Header />
            <main className="profile-container">
                <h2>Profil</h2>
                <form onSubmit={handleSave}>
                    <label>Valódi név:</label>
                    <input type="text" value={userData.realName} onChange={(e) => setUserData({ ...userData, realName: e.target.value })} />

                    <label>Felhasználónév:</label>
                    <input type="text" value={userData.nickName} disabled />

                    <label>Email:</label>
                    <input type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />

                    <label>Telefon:</label>
                    <input type="text" value={userData.phone} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} />

                    <label>Új jelszó (opcionális):</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit">Mentés</button>
                </form>
            </main>
            <Footer />
        </>
    );
};

export default Profile;
