import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css"; // CSS importálása
import headerImage from "./public/images/header.jpg";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
