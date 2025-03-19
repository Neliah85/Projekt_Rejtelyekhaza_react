import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const tracks = {
    room1: "Menekülés az iskolából",
    room2: "A pedellus bosszúja",
    room3: "A tanári titkai",
    room4: "A takarítónő visszanéz",
    room5: "Szabadulás Kódja",
    room6: "Időcsapda",
    room7: "KódX Szoba",
    room8: "Kalandok Kamrája",
    room9: "Titkok Labirintusa"
};

const Booking = () => {
    const { id } = useParams();
    const trackName = tracks[id];
    const [selectedDate, setSelectedDate] = useState("");
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState("");
    const [userData, setUserData] = useState({ userName: "", email: "", phone: "" });
    const [teamName, setTeamName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem("token");
        
        if (!userToken) {
            navigate("/login");
            return;
        }
    

        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/user-data");
                setUserData(response.data);
            } catch (error) {
                console.error("Hiba a felhasználói adatok lekérésekor:", error);
            }
        };
        fetchUserData();
    }, [navigate]);

    useEffect(() => {
        if (selectedDate) {
            axios.get("http://localhost:5000/api/available-times", {
                params: { trackId: id, date: selectedDate }
            })
            .then(response => {
                // A foglalt időpontok az API válaszában
                const bookedTimes = response.data.bookedTimes || [];
                // Az összes időpont listája
                const allTimes = ["9:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"];
                // Az elérhető időpontok, amelyek nincsenek a foglaltak között
                const freeTimes = allTimes.filter(time => !bookedTimes.includes(time));
    
                setAvailableTimes(freeTimes);  // Elérhető időpontok beállítása
                setSelectedTime("");  // A kiválasztott időpont resetelése
            })
            .catch(error => {
                console.error("Hiba az idősávok betöltésekor:", error);
                setAvailableTimes([]);  // Hiba esetén üres lista
            });
        }
    }, [selectedDate, id]);
    
    

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!selectedTime) {
            alert("Válassz egy szabad idősávot!");
            return;
        }
        const bookingData = {
            trackId: id,
            date: selectedDate,
            time: selectedTime,
            teamId: userData.teamId || null, // Ha van teamId, azt küldjük
            teamName: teamName || null, // Csak ha nincs már csapatnév megadva
        };
        try {
            const response = await axios.post("http://localhost:5000/api/bookings", bookingData, {
                headers: { "Content-Type": "application/json" }
            });
            alert(response.data.message);
        } catch (error) {
            console.error("Hiba a foglalás során:", error);
            alert("Hiba történt a foglalás során.");
        }
    };

    if (!trackName) {
        return (
            <>
                <Header />
                <main className="booking-container">
                    <h1>Hiba</h1>
                    <p>Ez a pálya nem létezik!</p>
                </main>
                <Footer />
            </>
        );
    }
    //*ha van user adatok alatt csapatnév azt is húzza be automatikusan, nem szerkeszthetőre, ha nincs legyen megadható, de lehet null
    return (
        <>
            <Header />
            <main>
                <section className="booking-section">
                    <h1>Foglalás - {trackName}</h1>
                    <form onSubmit={handleBooking}>
                        <label>Pálya:</label>
                        <input type="text" value={trackName} readOnly />

                        <label>Dátum:</label>
                        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required />

                        <label>Idősáv:</label>
                        <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required>
                            <option value="">Válassz időpontot</option>
                            {availableTimes.map((time) => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>

                        <label>Csapatnév:</label>
                            {userData.teamName ? (
                                <input type="text" value={userData.teamName} disabled />
                            ) : (
                                <input
                                    type="text"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    placeholder="Add meg a csapatnevet"
                                />
                            )}
                       
                        <label>Név:</label>
                        <input type="text" value={userData.userName} readOnly />

                        <label>Email:</label>
                        <input type="email" value={userData.email} readOnly />

                        <label>Telefon:</label>
                        <input type="text" value={userData.phone} readOnly />

                        <button type="submit">Foglalás</button>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Booking;