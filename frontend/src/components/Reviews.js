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

// Véletlenszerű szobát rendel, ha egy véleményben nincs `track`
const assignRandomTrack = (review) => ({
    ...review,
    track: review.track || tracks[Math.floor(Math.random() * tracks.length)]
});

// Alapértelmezett vélemények (hozzáadott szobanevekkel)
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

    // Betöltéskor ellenőrizzük a localStorage-t, és frissítjük a hiányzó `track` mezőket
    useEffect(() => {
        let storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        
        // Ha nincs egyetlen mentett vélemény sem, akkor az alapértelmezetteket használjuk
        if (storedReviews.length === 0) {
            storedReviews = defaultReviews;
            localStorage.setItem("reviews", JSON.stringify(defaultReviews));
        } else {
            // Frissítjük a véleményeket, ha nincs `track` mező
            storedReviews = storedReviews.map(assignRandomTrack);
            localStorage.setItem("reviews", JSON.stringify(storedReviews));
        }

        setReviews(storedReviews);
    }, []);

    return (
        <>
            <Header />
            <main className="reviews-container">
                <h1>Vélemények</h1>
                <p>Olvasd el látogatóink véleményét a Rejtélyek Házáról vagy írj saját véleményt!</p>

                {/* Vélemények listája */}
                <div className="reviews-list">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-item">
                            <h3>{review.name}</h3>
                            <p className="track-name"><strong>Pálya:</strong> {review.track}</p>
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
