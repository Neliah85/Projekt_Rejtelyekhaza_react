require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",  // Ha van jelszó, azt írd be ide
    database: "rejtelyekhaza"
});

db.connect(err => {
    if (err) {
        console.error("Adatbázis kapcsolódási hiba: ", err);
    } else {
        console.log("Sikeresen csatlakozott az adatbázishoz!");
    }
});

// Teszt endpoint
app.get("/", (req, res) => {
    res.send("API működik!");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Szerver fut a ${PORT}-es porton`);
});
