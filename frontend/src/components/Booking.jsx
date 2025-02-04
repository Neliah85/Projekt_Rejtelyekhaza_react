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
    
                // **Összes lehetséges idősáv**
                const allTimes = ["9:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"];
                
                // **Foglalások az API válaszából (átalakítás egyforma formátumra)**
                const bookedTimes = Array.isArray(response.data.bookedTimes)
                    ? response.data.bookedTimes.map(time => time.replace(/^0/, "")) // "09:00" -> "9:00"
                    : [];
    
                // **Szabad időpontok kiszámítása**
                const freeTimes = allTimes.filter(time => !bookedTimes.includes(time));
    
                console.log("Foglalások (piros kell legyen):", bookedTimes);
                console.log("Szabad időpontok (zöld kell legyen):", freeTimes);
    
                setAvailableTimes(freeTimes); // **Csak a szabad időpontokat állítjuk be**
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

                        
                        <label>Válassz egy időpontot:</label>
                            <div className="time-slots">
                                {["9:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"].map(time => {
                                    const isBooked = !availableTimes.includes(time);
                                    const isSelected = selectedTime === time; // Ellenőrizzük, hogy ki van-e választva
                                    return (
                                        <div
                                            key={time}
                                            className={`time-slot ${isBooked ? "booked" : isSelected ? "selected" : "available"}`}
                                            onClick={() => !isBooked && setSelectedTime(time)} // Csak a szabad időpontot lehet kijelölni
                                        >
                                            {time} {isBooked ? "(Foglalt)" : ""}
                                        </div>
                                    );
                                })}
                            </div>


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
