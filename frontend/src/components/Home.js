import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
    return (
        <>
            <Header />
            <main>
                <section>
                    <h1>Üdvözlünk a Rejtélyek Házában – A Kalandok és Titkok Birodalmában!</h1>
                    <p>A Rejtélyek Háza szabadulószoba 2023-ban nyitotta meg kapuit...</p>
                </section>

                <div className="tracks-grid">
                    {[...Array(9).keys()].map((i) => (
                        <figure key={i}>
                            <a href={`/palya${i + 1}`}>
                                <img src={`/images/palya${i + 1}.jpg`} alt={`Pálya ${i + 1}`} width="320" height="233"/>
                            </a>
                            <figcaption>Pálya {i + 1}</figcaption>
                        </figure>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Home;
