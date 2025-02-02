import React from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// Képek importálása
import palya1 from "../assets/images/palya1.jpg";
import palya2 from "../assets/images/palya2.jpg";
import palya3 from "../assets/images/palya3.jpg";
import palya4 from "../assets/images/palya4.jpg";
import palya5 from "../assets/images/palya5.jpg";
import palya6 from "../assets/images/palya6.jpg";
import palya7 from "../assets/images/palya7.jpg";
import palya8 from "../assets/images/palya8.jpg";
import palya9 from "../assets/images/palya9.jpg";

const tracks = {
    palya1: { name: "Menekülés az iskolából", img: palya1, description: "Itt lesz a részletes leírás" },
    palya2: { name: "A pedellus bosszúja", img: palya2, description: "Itt lesz a részletes leírás" },
    palya3: { name: "A tanári titkai", img: palya3, description: "Itt lesz a részletes leírás" },
    palya4: { name: "A takarítónő visszanéz", img: palya4, description: "Itt lesz a részletes leírás" },
    palya5: { name: "Szabadulás Kódja", img: palya5, description: "Itt lesz a részletes leírás" },
    palya6: { name: "Időcsapda", img: palya6, description: "Itt lesz a részletes leírás" },
    palya7: { name: "KódX Szoba", img: palya7, description: "Itt lesz a részletes leírás" },
    palya8: { name: "Kalandok Kamrája", img: palya8, description: "Itt lesz a részletes leírás" },
    palya9: { name: "Titkok Labirintusa", img: palya9, description: "Itt lesz a részletes leírás" }
};

const Track = () => {
    const { id } = useParams(); // URL-ből kiolvassuk a pálya ID-ját
    const track = tracks[id];

    if (!track) {
        return <h1>Pálya nem található!</h1>;
    }

    return (
        <>
            <Header />
            <main>
                <h1>{track.name}</h1>
                <img src={track.img} alt={track.name} width="600" />
                <p>{track.description}</p>
                <Link to={`/booking/${id}`} className="button">Foglalás</Link>
            </main>
            <Footer />
        </>
    );
};

export default Track;
