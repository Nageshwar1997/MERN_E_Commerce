require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        error: false,
        message: "Welcome to Backend",
    })
})

module.exports = app;
