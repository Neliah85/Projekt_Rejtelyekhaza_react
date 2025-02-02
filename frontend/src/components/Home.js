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
                <h1>Üdvözlünk a Rejtélyek Házában – A Kalandok és Titkok Birodalmában!</h1>
                <p>
                A Rejtélyek Háza szabadulószoba 2023-ban nyitotta meg kapuit a titkok és kihívások szerelmesei előtt, és azóta is töretlen népszerűségnek örvend. A szoba megalkotásánál egyetlen cél vezérelt minket: felejthetetlen élményt nyújtani minden korosztálynak, akik szeretik próbára tenni logikájukat, bátorságukat és csapatmunkájukat. Az elmúlt időszakban már több ezer látogató mérettette meg magát, és a visszajelzések alapján elmondhatjuk, hogy sikerült megteremteni azt a különleges atmoszférát, amitől a Rejtélyek Háza egyedivé válik.
                </p>
                <p>
                A Rejtélyek Házában jelenleg kilenc egyedülálló pálya várja azokat, akik készen állnak a kihívásokra. Minden egyes pálya gondosan kidolgozott, izgalmas történettel, változatos rejtvényekkel és fordulatos meglepetésekkel tarkítva, hogy minden látogatónk a lehető legnagyobb élményt élje át. Minden pálya más-más világba repíti a résztvevőket, legyen szó egy elfeledett templom titkairól, egy kísértetjárta kastély rejtélyeiről, vagy egy futurisztikus laboratórium veszélyes kísérleteiről. A pályák nemcsak a logikai készségeket, hanem a csapatmunkát és a kreativitást is próbára teszik, így minden csapat számára izgalmas kihívást jelentenek.
                </p>
                <p>
                Az elsődleges célunk, hogy a játékosok teljes mértékben belemerülhessenek a történetbe, és úgy érezzék, hogy ők maguk is a kaland részei. A pályáinkat tapasztalt dizájnerek és forgatókönyvírók tervezték, akik minden apró részletre odafigyeltek, hogy a játékosok valóban egy másik világba csöppenjenek. A különleges effektek, a gondosan kiválasztott zenei aláfestések és a helyszínek hiteles berendezése mind hozzájárulnak ahhoz, hogy a játékosok felejthetetlen élményben részesüljenek.
                </p>
                <p>A Rejtélyek Háza nem csupán egy egyszerű szabadulószoba – ez egy hely, ahol a barátságok erősödnek, a csapatok összekovácsolódnak, és ahol mindenki megélheti a sikerélmény örömét. Azok számára, akik először próbálják ki a szabadulószobát, csapatunk mindig készen áll arra, hogy segítséget nyújtson és irányítson a játék során, ha szükséges. Azonban ne aggódj, a tapasztaltabb játékosokat is számos kihívással várjuk, hiszen a pályáink különböző nehézségi szinteken kínálnak változatos élményeket.</p>
                <p>Az elmúlt egy évben számtalan különleges eseménynek adott otthont a Rejtélyek Háza. Legyen szó születésnapi buliról, céges csapatépítésről vagy akár egy baráti összejövetelről, pályáink tökéletes helyszínt biztosítanak az emlékezetes pillanatokhoz. Minden eseményt egyedi igények szerint alakítunk, hogy vendégeink a legjobbat kapják. Ha pedig különleges kívánságod van, bátran oszd meg velünk – mi mindent megteszünk, hogy a lehető legtöbbet hozzuk ki az alkalomból.</p>
                <p>A Rejtélyek Háza nem áll meg itt – folyamatosan dolgozunk új pályákon és frissítéseken, hogy mindig valami újjal és izgalmassal várhassunk vissza. Hiszünk abban, hogy a szórakozás sosem ér véget, és mindig van hova fejlődni. Ezért a jövőben is igyekszünk még több izgalmas és emlékezetes élménnyel gazdagítani látogatóinkat.</p>
                <p>Ha szeretnél egy igazán különleges kalandban részt venni, próbára tenni magad, és felfedezni a rejtélyek világát, akkor a Rejtélyek Háza a tökéletes választás számodra. Látogass el hozzánk, és éld át te is azt a varázslatos élményt, amit már annyian megtapasztaltak!</p>
                <p>Rejtélyek Háza – Ahol a Kalandok Kezdődnek!</p>
                
                
                
                
                <div className="tracks-grid">
                    {rooms.map((room) => (
                        <figure key={room.id}>
                            <a href={`/${room.id}`}>
                                <img src={room.img} alt={room.name} width="320" height="233" />
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
                    SPályáink mindegyike egyedi történettel és izgalmas feladványokkal vár, amelyek a legnagyobb figyelmet és kreativitást is megkövetelik. Legyen szó a régi iskolai rejtélyekről, egy modern technológiai kihívásról, vagy éppen egy misztikus kalandról, nálunk mindenki megtalálja a számára tökéletes pályát. Szakértő csapatunk gondoskodik arról, hogy minden apró részlet tökéletes legyen, és hogy a játékélmény maximálisan kielégítő legyen.
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
