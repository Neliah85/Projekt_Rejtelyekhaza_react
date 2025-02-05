const express = require("express");
const db = require("../db");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid"); 

const router = express.Router();


router.post("/register", async (req, res) => {
    console.log("Beérkező adatok:", req.body); 

    const { teamName, captainName, email, phone, password } = req.body;

    if (!teamName || !captainName || !email || !phone || !password) {
        console.error("Hiányzó mező:", { teamName, captainName, email, phone, password });
        return res.status(400).json({ error: "Minden mező kitöltése kötelező!" });
    }

    try {
        
        const checkEmailQuery = `SELECT email FROM csapatok WHERE email = ? LIMIT 1`;
        const [emailResult] = await db.query(checkEmailQuery, [email]);

        if (emailResult.length > 0) {
            return res.status(400).json({ error: "Ez az email cím már regisztrálva van!" });
        }

        
        const teamId = uuidv4();

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const insertQuery = `
            INSERT INTO csapatok (CsapatID, Nev, CsKapitany, email, telefonszam, SALT, HASH)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        await db.query(insertQuery, [teamId, teamName, captainName, email, phone, salt, hashedPassword]);

        res.json({ success: true, message: "Regisztráció sikeres!" });
    } catch (error) {
        console.error("Hiba a regisztráció során:", error);
        res.status(500).json({ error: "Adatbázis hiba!" });
    }
});

module.exports = router;
