import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate importálása
import Header from "./Header";
import Footer from "./Footer";

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
    palya1: {
        name: "Menekülés az iskolából",
        description: "Képzeld el, hogy a tanórák végeztével egy különös varázslat miatt az iskola minden ajtaja bezáródik, és egyetlen kivezető utat sem találsz. A feladatod, hogy felfedezd az iskola rejtett sarkaiban megbúvó titkokat és megoldj különböző rejtvényeket, hogy megtaláld a szabadulás kulcsát. Minden terem saját kihívásokkal vár, és a tanári szekrények, könyvtárak, valamint a régi iskolai iratok között rejtett nyomokat kereshetsz. Az iskola történetei és legendái segítenek vagy éppen hátráltatnak a megoldásban. A csapdák és meglepetések révén egyre közelebb kerülsz a kijutáshoz, de a végső próba még hátravan. Készen állsz, hogy megismerd az iskola legnagyobb titkait és kijuss az elzárt épületből?",
        image: palya1
    },
    palya2: {
        name: "A pedellus bosszúja",
        description: "A pedellus, a hírhedt iskolai felügyelő, akinek nevével még ma is rettegetnek, visszatért, hogy megkeserítse az életedet. Elcsíptél egy elfeledett feljegyzést, amely rávilágít arra, hogy bosszúja nem ért véget – sőt, most kezdődik igazán. A szobában minden egyes tárgy és rejtvény a pedellus mérgét és hatalmát hirdeti. Meg kell oldanod a titokzatos és zavarba ejtő feladványokat, hogy megtudd, milyen csapdákat állított eléd. Az idő szorít, mert a pedellus hatalma egyre nő, és a szobában rejlő titkok egyre nehezebbé teszik a menekülést. Készen állsz szembenézni a pedellus haragjával és megtalálni a kijáratot, mielőtt túl késő lenne?",
        image: palya2
    },
    palya3: {
        name: "A tanári titkai",
        description: "Belépve a tanári szobába, egy régi, elfeledett múlt köszön vissza rád. A tanárok sosem beszéltek a szoba rejtett titkairól, de most rajtad a sor, hogy felderítsd azokat. Minden asztalon, fiókban és könyvben új nyomok és kódok várnak felfedezésre. A titkos üzenetek és rejtélyes könyvek nyomozása során ráébredsz, hogy a tanárok egy évszázados titkot őriztek. Ahogy egyre mélyebbre ásol, úgy egyre több történelmi titok és személyes titok kerül felszínre. Vajon képes leszel megfejteni a tanári szoba rejtélyeit és megtalálni a titokzatos kódot, ami az ajtó nyitja?",
        image: palya3
    },
    palya4: {
        name: "A takarítónő visszanéz",
        description: "A takarítónő, aki sok éven keresztül dolgozott az épületben, visszatér, hogy megvédje titkait. A szobát, amit először csak egy egyszerű raktárnak gondoltál, rejtélyes eszközökkel és furcsa nyomokkal töltötte meg. Az ősi feljegyzések és a régi takarítószerek körül bonyolult rejtvények várnak rád. A helyszín tele van furcsa utalásokkal és nyomokkal, amelyek a takarítónő titkait próbálják elrejteni. A szobában eltöltött idő alatt megtudod, hogy a takarítónő élete nem volt olyan egyszerű, mint ahogy azt elsőre gondoltad. Meg tudod fejteni a titkokat és megtalálni a kiutat, vagy a takarítónő bosszúja végleg megbénít?",
        image: palya4
    },
    palya5: {
        name: "Szabadulás Kódja",
        description: "A Szabadulás Kódja egy titokzatos laboratórium ajtaját rejti, ahol minden egyes lépés egy újabb kihívást jelent. A laboratórium minden sarkában és berendezésében új feladványokat találsz, amelyek a szabadulás kulcsait rejtik. A falakon lévő rejtett kódok és a bonyolult gépek segítségével próbálhatod megfejteni a zárakat. Az idő ellened dolgozik, és a kódok megfejtésével próbálhatod meg elérni a végső célodat: a szabadulást. Képes leszel kibogozni a titokzatos kódokat, mielőtt az idő lejár?",
        image: palya5
    },
    palya6: {
        name: "Időcsapda",
        description: "Az Időcsapda szobában egy időutazás vár rád, ahol a múlt és a jövő határvonalán kell navigálnod. A szobában minden egyes elem – a régi órák, a futurisztikus eszközök és a rejtett mechanizmusok – egy új időszakot képvisel. A célod, hogy megtaláld az időcsapda rejtett kulcsát, miközben különböző időszakok rejtélyeivel kell szembenézned. Minden lépés egy új kihívást jelent, ahogy próbálod helyreállítani az idő vonalát és megtalálni a kiutat. Vajon sikerül kijutnod a múlt és a jövő labirintusából?",
        image: palya6
    },
    palya7: {
        name: "KódX Szoba",
        description: "A KódX Szoba egy technológiai labirintus, ahol minden digitális eszköz és kód egy újabb rejtélyt rejt. A szoba tele van fejlett technológiai eszközökkel, rejtett kódokkal és mechanikus rendszerekkel, amelyek megoldásához szükség van az intelligenciádra és kreativitásodra. A feladatod, hogy navigálj a digitális világban, és megfejtsd a rejtett kódokat, amelyek a szoba különböző pontjain elhelyezkednek. Minden egyes kód egy újabb lépést jelent a szabadulás felé, miközben technológiai csapdákkal és kihívásokkal találkozol. Meg tudod oldani a KódX Szoba titkait és kijutni az elektronikus labirintusból?",
        image: palya7
    },
    palya8: {
        name: "Kalandok Kamrája",
        description: "A Kalandok Kamrája egy mesés helyszín, ahol a fantázia és a kaland keveredik. Az ódon kamrában egy sor izgalmas feladvány és rejtett kincs vár felfedezésre. A szoba minden sarkában új kihívásokkal és varázslatos elemekkel találkozol, amelyek próbára teszik ügyességedet és bátorságodat. Az ősi könyvek, rejtett nyomok és varázslatos eszközök segítségével kell megtalálnod az utat a kijárat felé. A kaland során számos érdekes karakterrel és történettel találkozhatsz, amelyek további nyomokat adhatnak a célod eléréséhez. Készen állsz a legnagyobb kalandra és a kincs megtalálására?",
        image: palya8
    },
    palya9: {
        name: "Titkok Labirintusa",
        description: "A Titkok Labirintusa egy komplex és zavarba ejtő labirintus, ahol minden fordulat új titkokat és kihívásokat rejt. Az útvesztő falai között rejtett üzenetek, rejtélyes szimbólumok és bonyolult feladványok várnak rád. Ahogy egyre mélyebbre hatolsz a labirintusban, úgy egyre bonyolultabbá válnak a feladatok, és a labirintus rejtett titkai is fokozatosan feltárulnak. A célod, hogy megtaláld a kijáratot, miközben megoldod a titokzatos rejtvényeket és navigálsz a labirintus szűk folyosóin. Vajon sikerül kijutnod a Titkok Labirintusából és megfejteni a legnagyobb rejtélyeket?",
        image: palya9
    }
};

const TrackPage = () => {
    const { id } = useParams();
    const track = tracks[id];
    const navigate = useNavigate();
    const userToken = localStorage.getItem('userToken');

    const handleBookingClick = () => {
        if (!userToken) {
            navigate("/login");
            return; 
        }
        navigate(`/booking/${id}`);
    };

    if (!track) {
        return <div> A pálya nem található! </div>; 
    }

    return (
        <div>
            <Header />
            <div>
                <h1>{track.name}</h1>
                <img src={track.image} alt={track.name} />
                <p>{track.description}</p>
                <button onClick={handleBookingClick}>Foglalás</button>
            </div>
            <Footer />
        </div>
    );
};

export default TrackPage;
