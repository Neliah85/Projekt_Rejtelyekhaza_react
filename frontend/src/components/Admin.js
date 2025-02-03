import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Backend kapcsolat

const Admin = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [bookings, setBookings] = useState([]);
    const [maintenanceMode, setMaintenanceMode] = useState({});
    const [error, setError] = useState(""); // Hibaüzenet kezelése

    // Ellenőrizzük, hogy az admin be van-e jelentkezve
    useEffect(() => {
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
            navigate("/login"); // Ha nincs bejelentkezve, irány a bejelentkezés
        } else {
            setIsAuthenticated(true);
            fetchTracks();
        }
    }, [navigate]);

    // Pályák betöltése
    const fetchTracks = async () => {
        try {
            const response = await axios.get("http://localhost:5001/tracks"); // Backend API hívás
            setTracks(response.data);
        } catch (error) {
            console.error("Hiba a pályák betöltésekor:", error);
            setError("Nem sikerült betölteni a pályákat.");
        }
    };

    // Foglalások lekérése adott pályára és napra
    const fetchBookings = async () => {
        if (!selectedTrack || !selectedDate) {
            setError("Válassz ki egy pályát és egy dátumot!");
            return;
        }
        setError(""); // Hibaüzenet törlése
        try {
            const response = await axios.get(`http://localhost:5001/bookings?track=${selectedTrack}&date=${selectedDate}`);
            setBookings(response.data);
        } catch (error) {
            console.error("Hiba a foglalások lekérdezésekor:", error);
            setError("Nem sikerült lekérdezni a foglalásokat.");
        }
    };

    // Foglalás törlése
    const deleteBooking = async (bookingId) => {
        try {
            await axios.delete(`http://localhost:5001/bookings/${bookingId}`);
            setBookings(bookings.filter((booking) => booking.id !== bookingId));
        } catch (error) {
            console.error("Hiba a foglalás törlésekor:", error);
            setError("Nem sikerült törölni a foglalást.");
        }
    };

    // Karbantartási mód váltása
    const toggleMaintenance = (trackId) => {
        setMaintenanceMode((prev) => ({
            ...prev,
            [trackId]: !prev[trackId]
        }));
    };

    return isAuthenticated ? (
        <>
            <Header />
            <main className="admin-container">
                <h1>Adminisztrációs felület</h1>
                {error && <p className="error-message">{error}</p>}

                <section className="track-management">
                    <h2>Pályakezelés</h2>
                    {tracks.length > 0 ? (
                        tracks.map((track) => (
                            <div key={track.id} className="track-item">
                                <h3>{track.name}</h3>
                                <button onClick={() => toggleMaintenance(track.id)}>
                                    {maintenanceMode[track.id] ? "Karbantartás kikapcsolása" : "Karbantartás bekapcsolása"}
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Nincsenek elérhető pályák.</p>
                    )}
                </section>

                <section className="booking-management">
                    <h2>Foglalások kezelése</h2>
                    <label>Pálya:</label>
                    <select value={selectedTrack} onChange={(e) => setSelectedTrack(e.target.value)}>
                        <option value="">Válassz egy pályát</option>
                        {tracks.map((track) => (
                            <option key={track.id} value={track.id}>{track.name}</option>
                        ))}
                    </select>

                    <label>Dátum:</label>
                    <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                    <button onClick={fetchBookings}>Foglalások lekérése</button>

                    {bookings.length > 0 ? (
                        <ul>
                            {bookings.map((booking) => (
                                <li key={booking.id}>
                                    {booking.time} - {booking.name} ({booking.email})
                                    <button onClick={() => deleteBooking(booking.id)}>Törlés</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nincs foglalás erre a napra.</p>
                    )}
                </section>
            </main>
            <Footer />
        </>
    ) : null;
};

export default Admin;
