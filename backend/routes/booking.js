const express = require("express");
const db = require("../db");
const router = express.Router();

// Új foglalás mentése
router.post("/bookings", async (req, res) => {
    const { trackId, date, time, name, email, phone } = req.body;

    if (!trackId || !date || !time || !name || !email || !phone) {
        return res.status(400).json({ error: "Minden mező kitöltése kötelező!" });
    }

    const datetime = `${date} ${time}:00`;

    try {
        const query = `
            INSERT INTO foglalasok (palya_id, foglalas_idopont, nev, email, telefon)
            VALUES (?, ?, ?, ?, ?)
        `;
        await db.query(query, [trackId, datetime, name, email, phone]);

        res.json({ success: true, message: "Foglalás sikeresen rögzítve!" });
    } catch (error) {
        console.error("Hiba a foglalás mentésekor:", error);
        res.status(500).json({ error: "Adatbázis hiba!" });
    }
});

// Foglalás törlése (admin funkció)
router.delete("/bookings/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const query = "DELETE FROM foglalasok WHERE id = ?";
        await db.query(query, [id]);

        res.json({ success: true, message: "Foglalás sikeresen törölve!" });
    } catch (error) {
        console.error("Hiba a foglalás törlésekor:", error);
        res.status(500).json({ error: "Adatbázis hiba!" });
    }
});

module.exports = router;
