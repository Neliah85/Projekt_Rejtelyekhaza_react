import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedMaintenanceTrack, setSelectedMaintenanceTrack] = useState("");
    const [maintenanceMode, setMaintenanceMode] = useState({});
    const [error, setError] = useState("");

   /* useEffect(() => {
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
            navigate("/login");
        } else {
            setIsAuthenticated(true);
            fetchTracks();
            fetchUsers();
        }
    }, [navigate]);*/

    const fetchTracks = async () => {
        try {
            const response = await axios.get("http://localhost:5000/tracks");
            setTracks(response.data);
        } catch (error) {
            setError("Nem sikerült betölteni a pályákat.");
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/users");
            setUsers(response.data);
        } catch (error) {
            setError("Nem sikerült betölteni a felhasználókat.");
        }
    };

    const fetchBookings = async () => {
        if (!selectedTrack || !selectedDate) {
            setError("Válassz ki egy pályát és egy dátumot!");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5001/bookings?track=${selectedTrack}&date=${selectedDate}`);
            setBookings(response.data);
        } catch (error) {
            setError("Nem sikerült lekérdezni a foglalásokat.");
        }
    };

    const deleteBooking = async (bookingId) => {
        try {
            await axios.delete(`http://localhost:5001/bookings/${bookingId}`);
            setBookings(bookings.filter((booking) => booking.id !== bookingId));
        } catch (error) {
            setError("Nem sikerült törölni a foglalást.");
        }
    };

    const toggleMaintenance = () => {
        setMaintenanceMode((prev) => ({
            ...prev,
            [selectedMaintenanceTrack]: !prev[selectedMaintenanceTrack]
        }));
    };

    return isAuthenticated ? (
        <>
            <Header />
            <main className="admin-container">
                <h1>Adminisztrációs felület</h1>
                {error && <p className="error-message">{error}</p>}

                <div className="admin-grid">
                    {/* 1. Foglalások kezelése */}
                    <section className="admin-section">
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
                        {bookings.map((booking) => (
                            <div key={booking.id}>
                                {booking.time} - {booking.name}
                                <button onClick={() => deleteBooking(booking.id)}>Törlés</button>
                            </div>
                        ))}
                    </section>
                        {/* 2. Pályák karbantartása */}
                        <section className="admin-section">
                        <h2>Pályák karbantartása</h2>
                        <label>Válassz egy pályát:</label>
                        <select value={selectedMaintenanceTrack} onChange={(e) => setSelectedMaintenanceTrack(e.target.value)}>
                            <option value="">Válassz egy pályát</option>
                            {tracks.map((track) => (
                                <option key={track.id} value={track.id}>{track.name}</option>
                            ))}
                        </select>
                        <button onClick={toggleMaintenance}>
                            {maintenanceMode[selectedMaintenanceTrack] ? "Karbantartás kikapcsolása" : "Karbantartás bekapcsolása"}
                        </button>
                    </section>

                    {/* 2. Felhasználók kezelése */}
                    <section className="admin-section">
                        <h2>Felhasználók kezelése</h2>
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>Név</th>
                                    <th>Email</th>
                                    <th>Telefon</th>
                                    <th>Műveletek</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>
                                            <button>Törlés</button>
                                            <button>Módosítás</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                    
                    {/* 4. Versenytábla kezelése */}
                    <section className="admin-section">
                        <h2>Versenytábla kezelése</h2>
                        <label>Pálya:</label>
                        <select value={selectedTrack} onChange={(e) => setSelectedTrack(e.target.value)}>
                            <option value="">Válassz egy pályát</option>
                            {tracks.map((track) => (
                                <option key={track.id} value={track.id}>{track.name}</option>
                            ))}
                        </select>
                        <label>Csapatnév:</label>
                        <input type="text" />
                        <label>Foglalt időpont:</label>
                        <input type="datetime" />
                        <label>Eredmény</label>
                        <input type="time" />                        
                        <label>Kijutottak?</label>
                        <input type="checkbox" />
                        <button>Hozzáadás</button>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    ) : null;
};

export default Admin;
