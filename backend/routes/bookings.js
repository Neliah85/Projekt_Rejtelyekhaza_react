const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/bookings", async (req, res) => {
    console.log("Beérkező adatok:", req.body); 

    const { trackId, date, time, name, email, phone } = req.body;

    if (!trackId || !date || !time || !name || !email || !phone) {
        console.error("Hiányzó mező:", { trackId, date, time, name, email, phone });
        return res.status(400).json({ error: "Minden mező kitöltése kötelező!" });
    }

    try {
        const bookingDatetime = `${date} ${time}:00`;

        
        const teamQuery = `SELECT CsapatID FROM csapatok WHERE email = ? LIMIT 1`;
        const [teamResult] = await db.query(teamQuery, [email]);

        let teamId;
        if (teamResult.length > 0) {
            teamId = teamResult[0].CsapatID; 
        } else {
            
            const guestTeamId = `teamvendeg${trackId.replace("palya", "")}`;

            
            const checkGuestTeamQuery = `SELECT CsapatID FROM csapatok WHERE CsapatID = ? LIMIT 1`;
            const [guestTeamResult] = await db.query(checkGuestTeamQuery, [guestTeamId]);

            if (guestTeamResult.length > 0) {
                teamId = guestTeamId;
            } else {
                console.error(`Nem található előre létrehozott vendég csapat: ${guestTeamId}`);
                return res.status(500).json({ error: `Nem található a vendég csapat: ${guestTeamId}` });
            }
        }

        
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
