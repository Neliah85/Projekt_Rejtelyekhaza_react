import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const reviews = [
    { name: "Zoli92", rating: 5, text: "Fantasztikus élmény volt! Nagyon izgalmas feladatok és szuper díszletek!", escaped: true },
    { name: "AnitaK", rating: 4, text: "Nagyon élveztem, bár az utolsó feladat kifogott rajtunk!", escaped: false },
    { name: "CsapatBajnok", rating: 5, text: "A csapatmunka kulcsfontosságú volt, fantasztikus kihívás volt!", escaped: true },
    { name: "LauraM", rating: 4, text: "Izgalmas feladatok, barátságos játékmesterek. Egy picit több idő jól jött volna!", escaped: false },
    { name: "Gábor33", rating: 5, text: "Életem egyik legjobb szabadulószoba élménye!", escaped: true },
    { name: "Noémi86", rating: 5, text: "Csodálatos élmény, tökéletesen kidolgozott szobák!", escaped: true },
    { name: "David_T", rating: 4, text: "Nagyon jól szórakoztunk, de az egyik rejtvény kicsit nehéz volt számunkra.", escaped: false },
    { name: "MysteryLover", rating: 5, text: "Nagyon szeretem a rejtélyeket, és ez a hely tökéletes volt!", escaped: true },
    { name: "CsillaR", rating: 4, text: "Nagyon ötletes pályák, baráti társasággal szuper élmény volt.", escaped: true },
    { name: "Marci17", rating: 5, text: "Érdekes rejtvények, gyönyörű környezet. Mindenkinek ajánlom!", escaped: true },
    { name: "JaniMega", rating: 5, text: "Meglepetések és izgalmak mindenhol! Mindenképpen visszajövünk!", escaped: true },
    { name: "LillaS", rating: 4, text: "Jó pályák, de egy kis extra segítség néha jól jött volna.", escaped: false },
];

const getStars = (rating) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating);
};

const Reviews = () => {
    return (
        <>
            <Header />
            <main className="reviews-container">
                <h1>Vélemények</h1>
                <p>Olvasd el látogatóink véleményét a Rejtélyek Házáról!</p>

                <div className="reviews-list">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-item">
                            <h3>{review.name}</h3>
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
