const express = require("express");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = "titkoskulcs"; 


router.post("/login", async (req, res) => {
    console.log("Bejelentkezési adatok:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Minden mező kitöltése kötelező!" });
    }

    try {
        
        const query = `SELECT CsapatID, Nev, CsKapitany, HASH FROM csapatok WHERE email = ? LIMIT 1`;
        const [users] = await db.query(query, [email]);

        if (users.length === 0) {
            return res.status(401).json({ error: "Hibás email vagy jelszó!" });
        }

        const user = users[0];

        
        const passwordMatch = await bcrypt.compare(password, user.HASH);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Hibás email vagy jelszó!" });
        }

        
        const token = jwt.sign(
            { teamId: user.CsapatID, teamName: user.Nev, captain: user.CsKapitany, email },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({ success: true, token, teamName: user.Nev, teamId: user.CsapatID });
    } catch (error) {
        console.error("Hiba a bejelentkezés során:", error);
        res.status(500).json({ error: "Adatbázis hiba!" });
    }
});

module.exports = router;
