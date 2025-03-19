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

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/Users/${token}`); // Módosított végpont
                setUserData({
                    realName: response.data.realName,
                    nickName: response.data.nickName,
                    email: response.data.email,
                    phone: response.data.phone,
                    teamId: response.data.teamId,
                });
            } catch (error) {
                console.error("Hiba a felhasználói adatok lekérésekor:", error);
            }
        };
        fetchUserData();
    }, [navigate]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const updatedData = {
                ...userData,
                password: password || undefined,
            };
            await axios.post(`http://localhost:5000/Users/${token}`, updatedData); // Módosított végpont és HTTP metódus
            alert("Profil sikeresen frissítve!");
        } catch (error) {
            console.error("Hiba a profil frissítésekor:", error);
            alert("Hiba történt a profil frissítése során.");
        }
    };

    return (
        <>
            <Header />
            <main className="profile-container">
                <h1>Profil</h1>
                <form onSubmit={handleSave}>
                    <label>Felhasználónév:</label>
                    <input type="text" value={userData.nickName} readOnly />

                    <label>Név:</label>
                    <input
                        type="text"
                        value={userData.realName}
                        onChange={(e) => setUserData({ ...userData, realName: e.target.value })}
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />

                    <label>Telefonszám:</label>
                    <input
                        type="text"
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    />

                    <label>Csapat ID:</label>
                    <input
                        type="text"
                        value={userData.teamId || ""}
                        onChange={(e) => setUserData({ ...userData, teamId: e.target.value })}
                    />

                    <label>Új jelszó:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ha nem akarod módosítani, hagyd üresen"
                    />

                    <button type="submit" className="profile-container button">Mentés</button>
                </form>
            </main>
            <Footer />
        </>
    );
};

export default Profile;