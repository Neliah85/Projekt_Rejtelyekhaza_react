import React from "react";
import Header from "./Header";
import Footer from "./Footer";

// Képek importálása az `src/assets/images/` mappából
import palya1 from "../assets/images/palya1.jpg";
import palya2 from "../assets/images/palya2.jpg";
import palya3 from "../assets/images/palya3.jpg";
import palya4 from "../assets/images/palya4.jpg";
import palya5 from "../assets/images/palya5.jpg";
import palya6 from "../assets/images/palya6.jpg";
import palya7 from "../assets/images/palya7.jpg";
import palya8 from "../assets/images/palya8.jpg";
import palya9 from "../assets/images/palya9.jpg";

const Home = () => {
    const rooms = [
        { id: "palya1", name: "Menekülés az iskolából", img: palya1 },
        { id: "palya2", name: "A pedellus bosszúja", img: palya2 },
        { id: "palya3", name: "A tanári titkai", img: palya3 },
        { id: "palya4", name: "A takarítónő visszanéz", img: palya4 },
        { id: "palya5", name: "Szabadulás Kódja", img: palya5 },
        { id: "palya6", name: "Időcsapda", img: palya6 },
        { id: "palya7", name: "KódX Szoba", img: palya7 },
        { id: "palya8", name: "Kalandok Kamrája", img: palya8 },
        { id: "palya9", name: "Titkok Labirintusa", img: palya9 }
    ];

    return (
        <>
            <Header />
            <main>
                <h1>Üdvözlünk a Rejtélyek Házában – </h1>
                <h3>A Kalandok és Titkok Birodalmában!</h3>
                
                <p>Merülj el a kalandok világában, ahol minden rejtély új kihívásokat tartogat! Fedezd fel a legizgalmasabb szabadulószobákat, és tudd meg, képes vagy-e megoldani a rejtélyeket!</p>
                
                
                
                <div className="tracks-grid">
                    {rooms.map((room) => (
                        <figure key={room.id}>
                            <a href={`tracks/${room.id}`}>
                                <img src={room.img} alt={room.name} width="320" height="200" />
                            </a>
                            <figcaption>{room.name}</figcaption>
                        </figure>
                    ))}
                </div>

                <h2>Miért válaszd a mi szabadulószobánkat?</h2>
                <p>
                Amikor szabadulószobát választasz, fontos, hogy a legjobb élményt kapd. Mi a Rejtélyek Háza szabadulószobánál ezt pontosan tudjuk, és ezért mindent megteszünk, hogy vendégeink számára felejthetetlen kalandot nyújtsunk. Nálunk nem csupán egy egyszerű játékot találsz, hanem egy teljesen új világba való belépést, ahol a kihívások és a szórakozás keveredik.
                </p>
                <p>
                    Pályáink mindegyike egyedi történettel és izgalmas feladványokkal vár, amelyek a legnagyobb figyelmet és kreativitást is megkövetelik. Legyen szó a régi iskolai rejtélyekről, egy modern technológiai kihívásról, vagy éppen egy misztikus kalandról, nálunk mindenki megtalálja a számára tökéletes pályát. Szakértő csapatunk gondoskodik arról, hogy minden apró részlet tökéletes legyen, és hogy a játékélmény maximálisan kielégítő legyen.
                </p>
                <p>
                Szabadulószobáink nemcsak szórakoztatóak, hanem biztonságosak is. Folyamatosan figyelemmel kísérjük a játékmenetet, és segítséget nyújtunk, ha szükséges, így biztosítva, hogy a játék mindenki számára élvezetes és problémamentes legyen. A hangulatosan berendezett szobák, a kreatív feladványok és a különleges dizájn garantálják, hogy minden látogatás egy új kalandot jelent.
                </p>
                <p>Ne hagyd ki a lehetőséget, hogy részese legyél egy olyan élménynek, amely mind a kihívás, mind a szórakozás terén felülmúlja várakozásaidat. Látogass el hozzánk a Rejtélyek Házába, és tapasztald meg, miért vagyunk az egyik legkedveltebb szabadulószoba a városban. Itt az ideje, hogy megoldj egy rejtélyt, ami csak rád vár!</p>
                <p><strong>Tarts velünk, és fedezd fel a Rejtélyek Háza izgalmas világát – ahol a szórakozás és a kihívás határtalan!</strong></p>
            </main>
            <Footer />
        </>
    );
};

export default Home;
