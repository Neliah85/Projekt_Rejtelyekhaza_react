import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Booking from "./components/Booking";
import TracksPage from "./components/TracksPage";
import Track from "./components/Track";
import About from "./components/About";
import Prices from "./components/Prices";
import Reviews from "./components/Reviews"; // Vélemények oldal

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/booking/:id" element={<Booking />} />
                <Route path="/tracks" element={<TracksPage />} />
                <Route path="/tracks/:id" element={<Track />} />
                <Route path="/about" element={<About />} />
                <Route path="/prices" element={<Prices />} />
                <Route path="/reviews" element={<Reviews />} /> {/* Vélemények oldal */}
            </Routes>
        </Router>
    );
}

export default App;
