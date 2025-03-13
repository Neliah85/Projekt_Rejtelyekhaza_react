import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Profile = () => {
    const [userData, setUserData] = useState({ name: "", username: "", email: "", phone: "", teamName: "" });
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

   /* useEffect(() => {
        const userToken = localStorage.getItem("token");
        
        if (!userToken) {
            navigate("/login");
            return;
        }
    
        
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:5001/api/user-profile");
                setUserData(response.data);
            } catch (error) {
                console.error("Hiba a felhasználói adatok lekérésekor:", error);
            }
        };
        fetchUserData();
    }, [navigate]);*/

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const updatedData = { ...userData, password: password || undefined };
            await axios.put("http://localhost:5001/api/update-profile", updatedData, {
                headers: { "Content-Type": "application/json" }
            });
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
                    <input type="text" value={userData.username} readOnly />
                    
                    <label>Név:</label>
                    <input type="text" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                    
                    <label>Email:</label>
                    <input type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                    
                    <label>Telefonszám:</label>
                    <input type="text" value={userData.phone} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} />
                    
                    <label>Csapatnév:</label>
                    <input type="text" value={userData.teamName} onChange={(e) => setUserData({ ...userData, teamName: e.target.value })} />
                    
                    <label>Új jelszó:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ha nem akarod módosítani, hagyd üresen" />
                    
                    <button type="profile-container button">Mentés</button>
                </form>
            </main>
            <Footer />
        </>
    );
};

export default Profile;
