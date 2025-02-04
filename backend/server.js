require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // JSON adatok kezelése

// MySQL adatbázis csatlakozás
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Hiba az adatbázishoz csatlakozáskor: ", err);
    } else {
        console.log("Sikeres csatlakozás az adatbázishoz!");
    }
});

// Idősávok lekérése az adott pályára és napra
const availableTimesRouter = require("./routes/availableTimes");
app.use("/api", availableTimesRouter);

// Teszt végpont
app.get("/", (req, res) => {
    res.send("Backend fut!");
});

// Indítsuk el a szervert
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Szerver fut a ${PORT} porton`);
});
