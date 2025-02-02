import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Booking = () => {
    const [selectedTrack, setSelectedTrack] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleBooking = (e) => {
        e.preventDefault();
        console.log("Foglalás elküldve:", { selectedTrack, selectedDate, selectedTime, name, email, phone });
    };

    return (
        <>
            <Header />
            <main>
                <section className="booking-section">
                    <h1>Foglalás</h1>
                    <form onSubmit={handleBooking}>
                        <label>Pálya:</label>
                        <select value={selectedTrack} onChange={(e) => setSelectedTrack(e.target.value)} required>
                            <option value="">Válassz egy pályát</option>
                            <option value="palya1">Menekülés az iskolából</option>
                            <option value="palya2">A pedellus bosszúja</option>
                        </select>

                        <label>Dátum:</label>
                        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required />

                        <label>Idősáv:</label>
                        <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required>
                            <option value="">Válassz egy idősávot</option>
                            <option value="9:00-10:00">9:00-10:00</option>
                            <option value="10:30-11:30">10:30-11:30</option>
                        </select>

                        <label>Név:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <label>Telefonszám:</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />

                        <button type="submit">Foglalás</button>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Booking;
