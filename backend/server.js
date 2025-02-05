const express = require("express");
const cors = require("cors");
const db = require("./db"); 
const bookingRoutes = require("./routes/bookings");
const availableTimesRoutes = require("./routes/availableTimes");

const app = express();

app.use(express.json());
app.use(cors());


app.use("/api", bookingRoutes);
app.use("/api", availableTimesRoutes);


const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Szerver fut a ${PORT} porton...`);
});
