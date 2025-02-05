const express = require("express");
const db = require("../db");
const router = express.Router();

// Engedélyezett foglalási napok (0 = Vasárnap, 6 = Szombat)
const ALLOWED_DAYS = [2, 3, 4, 6]; // Kedd, szerda, csütörtök, szombat

// Foglalható idősávok
const DEFAULT_TIMES = ["9:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"];

router.get("/available-times", async (req, res) => {
    const { trackId, date } = req.query;
    
    if (!trackId || !date) {
        return res.status(400).json({ error: "Hiányzó pálya ID vagy dátum!" });
    }

    // Ellenőrizzük, hogy a kiválasztott nap engedélyezett-e
    const selectedDay = new Date(date).getDay();
    if (!ALLOWED_DAYS.includes(selectedDay)) {
        return res.json({ bookedTimes: DEFAULT_TIMES }); // Ha nem engedélyezett nap, mindent foglaltnak jelez
    }

    try {
        // 🔹 **Új és javított SQL lekérdezés**
        const query = `
            SELECT DISTINCT TIME_FORMAT(TIME(foglalas_idopont), '%H:%i') AS bookedTime
            FROM foglalasok
            WHERE palya_id = ? AND DATE(foglalas_idopont) = ?
        `;

        const [results] = await db.query(query, [trackId, date]);

        // 🔹 **Ellenőrizzük a visszatérő értékeket**
        console.log("Foglalások:", results);

        // 🔹 **Csak a valóban foglalt idősávokat küldjük vissza**
        const bookedTimes = results.map(row => row.bookedTime);
        res.json({ bookedTimes });
    } catch (error) {
        console.error("Hiba az idősávok lekérésekor:", error);
        res.status(500).json({ error: "Adatbázis hiba!" });
    }
});

module.exports = router;
