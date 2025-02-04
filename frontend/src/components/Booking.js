import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
    const { id } = useParams(); // Az URL-ből kiolvassuk a pálya ID-ját
    const trackName = tracks[id]; // Pálya neve
    const [selectedDate, setSelectedDate] = useState("");
    const [availableTimes, setAvailableTimes] = useState([]); // Elérhető időpontok mindig tömbként kezdődik!
    const [selectedTime, setSelectedTime] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // Ha a dátum változik, akkor frissítjük az elérhető idősávokat
    useEffect(() => {
        if (selectedDate) {
            axios.get(`http://localhost:5001/api/available-times`, {
                params: { trackId: id, date: selectedDate }
            })
            .then(response => {
                console.log("API válasz:", response.data); // Ellenőrizzük az API választ
                setAvailableTimes(Array.isArray(response.data.bookedTimes) ? response.data.bookedTimes : []);
                setSelectedTime(""); // Reseteljük az idősávot
            })
            .catch(error => {
                console.error("Hiba az idősávok betöltésekor:", error);
                setAvailableTimes([]); // Ha hiba van, üres tömböt állítunk be
            });
        }
    }, [selectedDate, id]);

    const handleBooking = async (e) => {
        e.preventDefault();

        if (!selectedTime) {
            alert("Válassz egy szabad idősávot!");
            return;
        }

        const bookingData = { trackId: id, date: selectedDate, time: selectedTime, name, email, phone };

        try {
            await axios.post("http://localhost:5001/api/bookings", bookingData);
            alert("Foglalás sikeres!");
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

                        <label>Idősáv:</label>
                        <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required disabled={!selectedDate}>
                            <option value="">Válassz egy idősávot</option>
                            {availableTimes.length > 0 ? (
                                availableTimes.map(time => (
                                    <option key={time} value={time}>{time}</option>
                                ))
                            ) : (
                                <option value="" disabled>Nincs szabad időpont</option>
                            )}
                        </select>

                        <label>Név:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <label>Telefonszám:</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />

                        <button type="submit" disabled={!selectedTime}>Foglalás</button>
                    </form>

                    <br />
                    {/* Foglalás regisztrációval gomb */}
                    <Link to="/register" className="booking-register-button">Foglalás regisztrációval</Link>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Booking;
