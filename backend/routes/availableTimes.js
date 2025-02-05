const express = require("express");
const db = require("../db");
const router = express.Router();


const ALLOWED_DAYS = [2, 3, 4, 6]; 


const DEFAULT_TIMES = ["9:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"];

router.get("/available-times", async (req, res) => {
    const { trackId, date } = req.query;
    
    if (!trackId || !date) {
        return res.status(400).json({ error: "Hiányzó pálya ID vagy dátum!" });
    }

    
    const selectedDay = new Date(date).getDay();
    if (!ALLOWED_DAYS.includes(selectedDay)) {
        return res.json({ bookedTimes: DEFAULT_TIMES }); 
    }

    try {
        
        const query = `
            SELECT DISTINCT TIME_FORMAT(TIME(foglalas_idopont), '%H:%i') AS bookedTime
            FROM foglalasok
            WHERE palya_id = ? AND DATE(foglalas_idopont) = ?
        `;

        const [results] = await db.query(query, [trackId, date]);

        
        console.log("Foglalások:", results);

        
        const bookedTimes = results.map(row => row.bookedTime);
        res.json({ bookedTimes });
    } catch (error) {
        console.error("Hiba az idősávok lekérésekor:", error);
        res.status(500).json({ error: "Adatbázis hiba!" });
    }
});

module.exports = router;
