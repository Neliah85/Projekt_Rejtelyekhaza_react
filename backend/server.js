const express = require("express");
const cors = require("cors");
const db = require("./db"); // MySQL kapcsolat
const bookingRoutes = require("./routes/booking");
const availableTimesRoutes = require("./routes/availableTimes");

const app = express();

app.use(express.json());
app.use(cors());

// API végpontok
app.use("/api", bookingRoutes);
app.use("/api", availableTimesRoutes);

// Szerver indítása
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Szerver fut a ${PORT} porton...`);
});
