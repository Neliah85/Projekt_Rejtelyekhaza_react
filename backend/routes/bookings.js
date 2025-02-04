const express = require("express");
const db = require("../db");
const router = express.Router();

// Foglalás beküldése adatbázisba
router.post("/bookings", async (req, res) => {
    const { trackId, date, time, name, email, phone } = req.body;

    if (!trackId || !date || !time || !name || !email || !phone) {
        return res.status(400).json({ error: "Minden mező kitöltése kötelező!" });
    }

    try {
        // A foglalás időpontját `YYYY-MM-DD HH:MM:00` formátumra alakítjuk
        const bookingDatetime = `${date} ${time}:00`;

        // Ellenőrizzük, hogy van-e csapat azonosító az email alapján
        const teamQuery = `SELECT CsapatID FROM csapatok WHERE email = ? LIMIT 1`;
        const [teamResult] = await db.query(teamQuery, [email]);

        let teamId = null;
        if (teamResult.length > 0) {
            teamId = teamResult[0].CsapatID; // Ha van csapat azonosító, akkor hozzárendeljük
        }

        // Beszúrás az adatbázisba, ha van csapat azonosító, azt is menti
        const query = `
            INSERT INTO foglalasok (palya_id, foglalas_idopont, csapat_id, nev, email, telefon)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await db.query(query, [trackId, bookingDatetime, teamId, name, email, phone]);

        res.json({ success: true, message: "Foglalás sikeresen létrehozva!" });
    } catch (error) {
        console.error("Hiba a foglalás mentésekor:", error);
        res.status(500).json({ error: "Adatbázis hiba!" });
    }
});

module.exports = router;
