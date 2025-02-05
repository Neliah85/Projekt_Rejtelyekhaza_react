const express = require("express");
const serverless = require("serverless-http");

const app = express();
app.use(express.json());

app.get("/hello", (req, res) => {
    res.json({ message: "Hello from Netlify Functions!" });
});

module.exports.handler = serverless(app);
