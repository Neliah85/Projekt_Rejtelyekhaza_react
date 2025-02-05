const mysql = require("mysql2/promise");

// Adatbázis kapcsolat beállítása
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "rejtelyekhaza",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;
