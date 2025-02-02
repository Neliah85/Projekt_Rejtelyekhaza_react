import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Booking from "./components/Booking";
import TracksPage from "./components/TracksPage";
import Track from "./components/Track";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/booking/:id" element={<Booking />} />
                <Route path="/tracks" element={<TracksPage />} />
                <Route path="/tracks/:id" element={<Track />} /> {/* Egyedi pályaoldal */}
            </Routes>
        </Router>
    );
}

export default App;
