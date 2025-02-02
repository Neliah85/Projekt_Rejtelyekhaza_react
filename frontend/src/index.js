import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import headerImage from "./assets/images/header.jpg";

document.body.style.backgroundImage = `url(${headerImage})`;
document.body.style.backgroundSize = "cover";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
