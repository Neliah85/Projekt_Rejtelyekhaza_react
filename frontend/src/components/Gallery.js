import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Gallery = () => {
    const [images, setImages] = useState([]);

    
    useEffect(() => {
        const storedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
        setImages(storedImages);
    }, []);

    
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImages = [...images, reader.result];
                setImages(newImages);
                localStorage.setItem("galleryImages", JSON.stringify(newImages)); 
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Header />
            <main className="gallery-container">
                <h1>Galéria</h1>
                <p>Itt láthatod a sikeresen kiszabadult csapatokat!</p>

                {/* Kép feltöltő gomb */}
                <label className="upload-button">
                    📷 Kép feltöltése
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                </label>

                {/* Galéria képek */}
                <div className="gallery-grid">
                    {images.map((image, index) => (
                        <div key={index} className="gallery-item">
                            <img src={image} alt={`Feltöltött kép ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Gallery;
