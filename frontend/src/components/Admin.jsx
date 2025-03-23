import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import allTimes from './Times.js';



const Admin = () => {
    const navigate = useNavigate();
    const [rooms] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedDate1, setSelectedDate1] = useState("");
    const [bookingsList, setBookingsList] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedRoomIdForMaintenance, setSelectedRoomIdForMaintenance] = useState("");
    const [selectedTimes, setSelectedTimes] = useState([]);    
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedRoomIdForCompetition, setSelectedRoomIdForCompetition] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [isAvailable, setIsAvailable] = useState(false);
    const [competitionMessage, setCompetitionMessage] = useState("");
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');
    const [successMessage, setSuccessMessage] = useState("");
    
    

    const handleCompetitionRoomChange = (event) => {
        setSelectedRoomIdForCompetition(event.target.value);
        setCompetitionMessage("");
    };

    const handleHoursChange = (event) => {
        setHours(event.target.value);
    };

    const handleMinutesChange = (event) => {
        setMinutes(event.target.value);
    };

    const handleSecondsChange = (event) => {
        setSeconds(event.target.value);
    };


    const loadInitialData = useCallback(async () => {
        const token = localStorage.getItem("token");
        await Promise.all([getUsers(token)]);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            setIsLoggedIn(false);
            return;
        }
        setIsLoggedIn(true);
        loadInitialData();
    }, [navigate, loadInitialData]);

    
      const getUsers = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(`http://localhost:5000/Users/${token}`);
          setUsers(response.data);
        } catch {
          setError("Nem sikerült betölteni a felhasználókat.");
        }
      };

    const loadBookings = async () => {
        const token = localStorage.getItem("token");
        if (!selectedRoomId || !selectedDate) {
          setError("Válassz ki egy szobát és egy dátumot!");
          return;
        }
        try {
          const response = await axios.get(
            `http://localhost:5000/Booking/${token}?room=${selectedRoomId}&date=${selectedDate}`
          );
          setBookingsList(response.data);
        } catch {
          setError("Nem sikerült lekérdezni a foglalásokat.");
        }
      };

            const deleteBooking = async (bookingId) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`http://localhost:5000/Booking/${bookingId}/${token}`);
            setBookingsList(bookingsList.filter((booking) => booking.BookingId !== bookingId));
        } catch {
            setError("Nem sikerült törölni a foglalást.");
        }
        };

        const handleTimeSelection = (time) => {
            setSelectedTimes(prev =>
                prev.includes(time)
                    ? prev.filter(t => t !== time)
                    : [...prev, time]
            );
        };
    
        const toggleMaintenance = async () => {
            console.log("selectedRoomIdForMaintenance:", selectedRoomIdForMaintenance);
            console.log("selectedDate:", selectedDate1);
            console.log("selectedTimes:", selectedTimes);
            
            const token = localStorage.getItem("token");
            if (!selectedRoomIdForMaintenance || !selectedDate1 || selectedTimes.length === 0) {
                setError("Válassz egy szobát, egy dátumot és legalább egy időpontot!");
                return;
            }
    
            for (const time of selectedTimes) {            
                try {
                    const formattedTime = time;
                    const formattedDateTime = `${selectedDate1}T${formattedTime}`;
                    await axios.post(`http://localhost:5000/Booking/${token}`, {
                        bookingDate: formattedDateTime,
                        roomId: selectedRoomIdForMaintenance,
                        teamId: "1",
                        comment: "Karbantartás",
                    });
                } catch (error) {
                    setError(`Nem sikerült beküldeni: ${time} - ${error.message}`);
                    return;
                }
            }
            setError("");
            setSuccessMessage("A karbantartás sikeresen beállítva!");
        };

         
          const handleSaveCompetition = async () => {
            const token = localStorage.getItem("token");
            const resultTime = `${hours}:${minutes}:${seconds}`;
    
            try {
                const response = await axios.put(
                    `http://localhost:5000/Booking/SaveResult/${token}`,
                    {}, 
                    {
                        params: {
                            bookingDate: bookingDate,
                            roomId: selectedRoomIdForCompetition,
                            result: resultTime,
                        },
                    }
                );
    
                if (response.status === 200) {
                    setCompetitionMessage("Versenyadatok sikeresen mentve!");
                } else {
                    setCompetitionMessage("Hiba a versenyadatok mentésekor.");
                }
            } catch (error) {
                setCompetitionMessage("Hiba a versenyadatok mentésekor: " + error.message);
                console.error(error);
            }
        };


    return isLoggedIn ? (
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
                        <select
                            value={selectedRoomId}
                            onChange={(e) => setSelectedRoomId(e.target.value)}
                        >
                            <option value="">Válassz egy szobát</option>
                            <option value="1">Menekülés az iskolából</option>
                            <option value="2">A pedellus bosszúja</option>
                            <option value="3">A tanári titkai</option>
                            <option value="4">A takarítónő visszanéz</option>
                            <option value="5">Szabadulás Kódja</option>
                            <option value="6">Időcsapda</option>
                            <option value="7">KódX Szoba</option>
                            <option value="8">Kalandok Kamrája</option>
                            <option value="9">Titkok Labirintusa</option>                             
                            
                        </select>
                        <label>Dátum:</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                        <button onClick={loadBookings}>Foglalások lekérése</button>
                        {bookingsList.map((booking) => (
                            <div key={booking.BookingId}>
                                {booking.BookingDate} - {booking.Team?.Id - booking.comment}
                                <button onClick={() => deleteBooking(booking.BookingId)}>
                                    Törlés
                                </button>
                            </div>
                        ))}
                    </section>

                    <section className="admin-section">
                            <h2>Szobák karbantartása</h2>
                            <label>Válassz egy szobát:</label>
                            <select onChange={(e) => setSelectedRoomIdForMaintenance(e.target.value)}>
                                <option value="">Válassz egy szobát</option>
                                <option value="1">Menekülés az iskolából</option>
                                <option value="2">A pedellus bosszúja</option>
                                <option value="3">A tanári titkai</option>
                                <option value="4">A takarítónő visszanéz</option>
                                <option value="5">Szabadulás Kódja</option>
                                <option value="6">Időcsapda</option>
                                <option value="7">KódX Szoba</option>
                                <option value="8">Kalandok Kamrája</option>
                                <option value="9">Titkok Labirintusa</option>
                            </select>
                            <label>Dátum:</label>
                            <input type="date" value={selectedDate1} onChange={(e) => setSelectedDate1(e.target.value)} />
                            <div>
                                {allTimes.map(time => (
                                    <label key={time}>
                                        <input type="checkbox" value={time} onChange={() => handleTimeSelection(time)} />
                                        {time}
                                    </label>
                                ))}
                            </div>
                            <button onClick={toggleMaintenance}>
                                Karbantartás beállítása
                            </button>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                        </section>

                    {/* 3. Felhasználók kezelése */}
                    <section className="admin-section">
                        <h2>Felhasználók kezelése</h2>
                        
                        <table className="user-table">
                            <thead>
                            <tr>
                                <th>Név</th>
                                <th>Email</th>
                                <th>Telefon</th>
                                <th>Jogosultság</th>
                                <th>Csapat ID</th>
                                <th>Műveletek</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr key={user.UserId}>
                                <td>{user.realName}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.roleId}</td>
                                <td>{user.teamId}</td>
                                
                                <td>
                                    <div>
                                    <div className="icon-button edit" onClick={onclick}>
                                        <FaEdit />
                                    </div>
                                    <div className="icon-button delete" onClick={onclick}>
                                        <FaTrash />
                                    </div>
                                    </div>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <button onClick={getUsers}>Felhasználók betöltése</button>
                        </section>

                    {/* 4. Versenytábla kezelése */}
                   <section className="admin-section">
                <h2>Versenytábla kezelése</h2>
                <label>Szoba:</label>
                <select
                    value={selectedRoomIdForCompetition}
                    onChange={handleCompetitionRoomChange}
                >
                            
                            <option value="">Válassz egy szobát</option>
                                <option value="1">Menekülés az iskolából</option>
                                <option value="2">A pedellus bosszúja</option>
                                <option value="3">A tanári titkai</option>
                                <option value="4">A takarítónő visszanéz</option>
                                <option value="5">Szabadulás Kódja</option>
                                <option value="6">Időcsapda</option>
                                <option value="7">KódX Szoba</option>
                                <option value="8">Kalandok Kamrája</option>
                                <option value="9">Titkok Labirintusa</option>
                            {rooms.map((room) => (
                                <option key={room.RoomId} value={room.RoomId}>
                                    {room.Name}
                                </option>
                            ))}
                       </select>
                            <label>Foglalt időpont:</label>
                            <input type="datetime-local" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />

                            <label>Eredmény:</label>
                            <input
                                type="number"
                                value={hours}
                                onChange={handleHoursChange}
                                min="0"
                                max="23"
                            />
                            :
                            <input
                                type="number"
                                value={minutes}
                                onChange={handleMinutesChange}
                                min="0"
                                max="59"
                            />
                            :
                            <input
                                type="number"
                                value={seconds}
                                onChange={handleSecondsChange}
                                min="0"
                                max="59"
                            />

                            <label>Kijutottak?</label>
                            <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />

                            <button onClick={handleSaveCompetition}>Hozzáadás</button>

                            {competitionMessage && <p>{competitionMessage}</p>}
                            </section>
                </div>
            </main>
            <Footer />
        </>
    ) : null;
};

export default Admin;