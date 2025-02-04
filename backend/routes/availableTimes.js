const express = require("express");
const router = express.Router();
const db = require("../db"); // MySQL kapcsolat

// Idősávok lekérése az adott pályára és napra
router.get("/available-times", async (req, res) => {
    const { trackId, date } = req.query;

    if (!trackId || !date) {
        return res.status(400).json({ message: "Hiányzó pálya vagy dátum!" });
    }

    try {
        // Előre meghatározott idősávok
        const allTimes = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30"];

        // Lekérdezzük a már lefoglalt időpontokat
        const sql = "SELECT TIME(datetime) as bookedTime FROM bookings WHERE track_id = ? AND DATE(datetime) = ?";
        const [results] = await db.query(sql, [trackId, date]);

        // Foglalt idősávok kiszedése a lekérdezésből
        const bookedTimes = results.map(row => row.bookedTime);

        // Szabad idősávok kiszűrése
        const availableTimes = allTimes.filter(time => !bookedTimes.includes(time));

        res.json({ availableTimes });
    } catch (error) {
        console.error("Hiba az idősávok lekérésében:", error);
        res.status(500).json({ message: "Szerverhiba!" });
    }
});

module.exports = router;
