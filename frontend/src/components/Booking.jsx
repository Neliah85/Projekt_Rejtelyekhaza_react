import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const tracks = {
    palya1: "Menekülés az iskolából",
    palya2: "A pedellus bosszúja",
    palya3: "A tanári titkai",
    palya4: "A takarítónő visszanéz",
    palya5: "Szabadulás Kódja",
    palya6: "Időcsapda",
    palya7: "KódX Szoba",
    palya8: "Kalandok Kamrája",
    palya9: "Titkok Labirintusa"
};

const Booking = () => {
    const { id } = useParams();
    const trackName = tracks[id];
    const [selectedDate, setSelectedDate] = useState("");
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [teamName, setTeamName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        
        if (!isLoggedIn()) {
            navigate("/login");
            return;
        }

        
        const userData = getUserData();
        if (userData) {
            setName(userData.name || "");
            setEmail(userData.email || "");
            setPhone(userData.phone || "");
        }

        if (selectedDate) {
            axios.get(`http://localhost:5001/api/available-times`, {
                params: { trackId: id, date: selectedDate }
            })
            .then(response => {
                const allTimes = ["9:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"];
                const bookedTimes = Array.isArray(response.data.bookedTimes)
                    ? response.data.bookedTimes.map(time => time.replace(/^0/, ""))
                    : [];
                const freeTimes = allTimes.filter(time => !bookedTimes.includes(time));
                setAvailableTimes(freeTimes);
                setSelectedTime("");
            })
            .catch(error => {
                console.error("Hiba az idősávok betöltésekor:", error);
                setAvailableTimes([]);
            });
        }
    }, [selectedDate, id, navigate]);

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
            name,
            email,
            phone,
            teamName,
        };
        try {
            const response = await axios.post("http://localhost:5001/api/bookings", bookingData, {
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

                        {selectedDate && (
                            <>
                                <label>Válassz egy idősávot:</label>
                                <div className="time-slots">
                                    {["9:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"].map(time => {
                                        const isBooked = !availableTimes.includes(time);
                                        const isSelected = selectedTime === time;
                                        return (
                                            <div key={time} className={`time-slot ${isBooked ? "booked" : isSelected ? "selected" : "available"}`} onClick={() => !isBooked && setSelectedTime(time)}>
                                                {time} {isBooked ? "(Foglalt)" : ""}
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}

                        <label>Név:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <label>Telefonszám:</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />

                        <label>Csapatnév:</label>
                        <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} required />

                        <button type="submit" disabled={!selectedTime}>Foglalás</button>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Booking;


function isLoggedIn() {
    
    return true; 
}

function getUserData() {
    
    return {
        name: "Példa Név",
        email: "pelda@email.com",
        phone: "+36301234567"
    };
}