import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import allTimes from './Times.js';

const tracks = {
    room1: { name: "Menekülés az iskolából", roomId: 1 },
    room2: { name: "A pedellus bosszúja", roomId: 2 },
    room3: { name: "A tanári titkai", roomId: 3 },
    room4: { name: "A takarítónő visszanéz", roomId: 4 },
    room5: { name: "Szabadulás Kódja", roomId: 5 },
    room6: { name: "Időcsapda", roomId: 6 },
    room7: { name: "KódX Szoba", roomId: 7 },
    room8: { name: "Kalandok Kamrája", roomId: 8 },
    room9: { name: "Titkok Labirintusa", roomId: 9 }
};

const Booking = () => {
    const { id } = useParams();
    const track = tracks[id];
    const trackName = track ? track.name : null;
    const roomId = track ? track.roomId : null;
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
                const userName = localStorage.getItem("username");
                const response = await axios.get(`http://localhost:5000/Users/GetByUserName/${token},${userName}`);
                setUserData({
                    realName: response.data.realName,
                    email: response.data.email,
                    phone: response.data.phone,
                    teamId: response.data.teamId,
                    nickName: response.data.nickName,
                });
                
            } catch (error) {
                console.error("Hiba a felhasználói adatok lekérésekor:", error);
                navigate("/login");
            }
        };
        getUserData();
    }, [navigate, token]); // userName eltávolítva a függőségi tömbből

    useEffect(() => {
        if (selectedDate && roomId) {
            axios.get(`http://localhost:5000/Booking/CheckBooking${token}`, {
                params: { day: selectedDate, roomId: roomId }
            })
                .then(response => {
                    const bookedTimes = response.data.map(booking => {
                        const date = new Date(booking.bookingDate);
                        return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
                    });
                    const freeTimes = allTimes.filter(time => !bookedTimes.includes(time));
                    setAvailableTimes(freeTimes);
                    setSelectedTime("");
                })
                .catch(error => {
                    console.error("Hiba az idősávok betöltésekor:", error);
                    setAvailableTimes([]);
                });
        }
    }, [selectedDate, roomId, token]);

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!selectedTime) {
            alert("Válassz egy szabad idősávot!");
            return;
        }

        try {
            const bookingData = {
                bookingDate: selectedDate + "T" + selectedTime + ":00.000Z",
                roomId: roomId,
                teamId: userData.teamId || 0, // Ha nincs teamId, akkor 0
                comment: "online foglalás",
            };      


            const response = await axios.post(`http://localhost:5000/Booking/NewBooking/${token}`, bookingData);
        
            if (response.status === 200) {
                alert("Sikeres foglalás!");
                console.log(response.data); // Backend üzenetének megjelenítése
            } else {
                alert("Hiba a karbantartás beállításakor.");
                alert(""); // Sikeres üzenet törlése, ha hiba van
            }
        } catch (error) {
            alert(`Nem sikerült beküldeni: ${error.message}`);
            alert(""); // Sikeres üzenet törlése, ha hiba van
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
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            required
                        />

                        {selectedDate && (
                            <>
                                <label>Válassz egy idősávot:</label>
                                <div className="time-slots">
                                    {allTimes.map(time => {
                                        const isBooked = !availableTimes.includes(time);
                                        const isSelected = selectedTime === time;
                                        return (
                                            <div
                                                key={time}
                                                className={`time-slot ${isBooked ? "booked" : isSelected ? "selected" : "available"}`}
                                                onClick={() => !isBooked && setSelectedTime(time)}
                                            >
                                                {time} {isBooked ? "(Foglalt)" : ""}
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                        <p>Név: {userData.realName}</p>

                        <p>Felhasználónév: {userData.nickName}</p>

                        <p>Telefonszám: {userData.phone}</p>

                        <p>Email cím: {userData.email}</p>

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