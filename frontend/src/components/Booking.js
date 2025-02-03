import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
    const trackName = tracks[id]; // Megkeressük a megfelelő pálya nevét

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleBooking = (e) => {
        e.preventDefault();
        console.log("Foglalás elküldve:", { trackName, selectedDate, selectedTime, name, email, phone });
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
                            <option value="">Válassz egy idősávot</option>
                            <option value="9:00-10:00">9:00-10:00</option>
                            <option value="10:30-11:30">10:30-11:30</option>
                            <option value="12:00-13:00">12:00-13:00</option>
                            <option value="13:30-14:30">13:30-14:30</option>
                            <option value="15:00-16:00">15:00-16:00</option>
                        </select>

                        <label>Név:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <label>Telefonszám:</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />

                        <button type="submit">Foglalás</button>
                    </form>
                        <br></br>
                    {/* Új gomb a regisztrációhoz */}
                    <Link to="/register" className="booking-register-button">Foglalás regisztrációval</Link>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Booking;
