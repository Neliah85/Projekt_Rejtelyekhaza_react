import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import allTimes from './Times.js';

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
    const [userData, setUserData] = useState({ realName: "", email: "", phone: "", teamId: null });
    const [teamName, setTeamName] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const getUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/Users/${token}`);
                setUserData({
                    realName: response.data.realName,
                    email: response.data.email,
                    phone: response.data.phone,
                    teamId: response.data.teamId
                });
            } catch (error) {
                console.error("Hiba a felhasználói adatok lekérésekor:", error);
                navigate("/login");
            }
        };
        getUserData();
    }, [navigate, token]);

    useEffect(() => {
        if (selectedDate) {
            axios.get(`http://localhost:5000/Booking/${token}`, {
                params: { day: selectedDate, roomId: id }
            })
                .then(response => {
                                     
                    const bookedTimes = response.data.map(booking => booking.time);
                    const freeTimes = allTimes.filter(time => !bookedTimes.includes(time));
                    setAvailableTimes(freeTimes);
                    setSelectedTime("");
                })
                .catch(error => {
                    console.error("Hiba az idősávok betöltésekor:", error);
                    setAvailableTimes([]);
                });
        }
    }, [selectedDate, id, token]);

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!selectedTime) {
            alert("Válassz egy szabad idősávot!");
            return;
        }
        const bookingData = {
            roomId: parseInt(id),
            bookingDate: selectedDate + "T" + selectedTime + ":00.000Z",
            teamId: userData.teamId || null,
            comment: teamName || null
        };
        try {
            const response = await axios.post(`http://localhost:5000/Booking/${token}`, bookingData);
            alert(response.data.message);
            navigate("/bookings");
        } catch (error) {
            console.error("Hiba a foglalás során:", error);
            alert(error.response?.data?.message || "Hiba történt a foglalás során.");
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
                        <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} />

                        <button type="submit">Foglalás</button>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Booking;
