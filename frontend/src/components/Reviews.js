import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

// Pályák listája
const tracks = [
    "Menekülés az iskolából",
    "A pedellus bosszúja",
    "A tanári titkai",
    "A takarítónő visszanéz",
    "Szabadulás Kódja",
    "Időcsapda",
    "KódX Szoba",
    "Kalandok Kamrája",
    "Titkok Labirintusa"
];

// Alapértelmezett vélemények (csak ha a localStorage üres)
const defaultReviews = [
    { name: "Zoli92", rating: 5, text: "Fantasztikus élmény volt! Nagyon izgalmas feladatok és szuper díszletek!", escaped: true, track: "Menekülés az iskolából" },
    { name: "AnitaK", rating: 4, text: "Nagyon élveztem, bár az utolsó feladat kifogott rajtunk!", escaped: false, track: "A pedellus bosszúja" },
    { name: "CsapatBajnok", rating: 5, text: "A csapatmunka kulcsfontosságú volt, fantasztikus kihívás volt!", escaped: true, track: "A tanári titkai" },
    { name: "LauraM", rating: 4, text: "Izgalmas feladatok, barátságos játékmesterek. Egy picit több idő jól jött volna!", escaped: false, track: "A takarítónő visszanéz" },
    { name: "Gábor33", rating: 5, text: "Életem egyik legjobb szabadulószoba élménye!", escaped: true, track: "Szabadulás Kódja" },
    { name: "Noémi86", rating: 5, text: "Csodálatos élmény, tökéletesen kidolgozott szobák!", escaped: true, track: "Időcsapda" },
    { name: "David_T", rating: 4, text: "Nagyon jól szórakoztunk, de az egyik rejtvény kicsit nehéz volt számunkra.", escaped: false, track: "KódX Szoba" },
];

// Csillagok generálása
const getStars = (rating) => "⭐".repeat(rating) + "☆".repeat(5 - rating);

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    // Betöltéskor ellenőrizzük a localStorage-t, és csak ha üres, akkor töltjük be az alapértelmezett véleményeket
    useEffect(() => {
        const storedReviews = JSON.parse(localStorage.getItem("reviews"));
        if (storedReviews && storedReviews.length > 0) {
            setReviews(storedReviews);
        } else {
            setReviews(defaultReviews);
            localStorage.setItem("reviews", JSON.stringify(defaultReviews));
        }
    }, []);

    // Új vélemény beküldése
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [rating, setRating] = useState(5);
    const [escaped, setEscaped] = useState(true);
    const [selectedTrack, setSelectedTrack] = useState(tracks[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !text) return;

        const newReview = { name, text, rating, escaped, track: selectedTrack };
        const updatedReviews = [...reviews, newReview];

        setReviews(updatedReviews);
        localStorage.setItem("reviews", JSON.stringify(updatedReviews));

        // Mezők ürítése
        setName("");
        setText("");
        setRating(5);
        setEscaped(true);
        setSelectedTrack(tracks[0]);
    };

    return (
        <>
            <Header />
            <main className="reviews-container">
                <h1>Vélemények</h1>
                <p>Olvasd el látogatóink véleményét a Rejtélyek Házáról vagy írj saját véleményt!</p>

                {/* Vélemény beküldő űrlap */}
                <form className="review-form" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Nicknév" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                    <textarea 
                        placeholder="Írd le a véleményed..." 
                        value={text} 
                        onChange={(e) => setText(e.target.value)} 
                        required
                    />
                    <label>Értékelés:</label>
                    <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{getStars(num)}</option>
                        ))}
                    </select>
                    <label>Melyik pályán voltatok?</label>
                    <select value={selectedTrack} onChange={(e) => setSelectedTrack(e.target.value)}>
                        {tracks.map((track, index) => (
                            <option key={index} value={track}>{track}</option>
                        ))}
                    </select>
                    <label>Kijutottatok?</label>
                    <div className="radio-buttons">
                        <label>
                            <input 
                                type="radio" 
                                value="true" 
                                checked={escaped} 
                                onChange={() => setEscaped(true)}
                            />
                            Igen ✅
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                value="false" 
                                checked={!escaped} 
                                onChange={() => setEscaped(false)}
                            />
                            Nem ❌
                        </label>
                    </div>
                    <button type="submit">Vélemény beküldése</button>
                </form>

                {/* Vélemények listája */}
                <div className="reviews-list">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-item">
                            <h3>{review.name} – {review.track}</h3>
                            <p className="stars">{getStars(review.rating)}</p>
                            <p className="review-text">"{review.text}"</p>
                            <p className="escaped">{review.escaped ? "Sikerült kijutni! ✅" : "Sajnos nem jutottunk ki. ❌"}</p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Reviews;
