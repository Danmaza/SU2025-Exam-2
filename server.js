// Load modules
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

// Create app
const app = express();

// Set view engine
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// API URL
const API_URL = "https://v6.exchangerate-api.com/v6/cb1d0861b7f003a6bec09003/latest/USD";

// Root route – first page load
app.get("/", function (req, res) {
    res.render("index", { currencies: null });
});

// Load route – fetch random currency data
app.get("/load", function (req, res) {
    axios.get(API_URL)
        .then((response) => {
            const rates = response.data.conversion_rates;
            const keys = Object.keys(rates).filter(code => code !== "USD");

            // Pick 3 unique random currencies
            const selected = [];
            while (selected.length < 3) {
                const rand = keys[Math.floor(Math.random() * keys.length)];
                if (!selected.includes(rand)) selected.push(rand);
            }

            // Prepare display data
            const currencies = selected.map(code => {
                const rate = rates[code];
                const costInUSD = (100 / rate).toFixed(2);
                return {
                    code,
                    rate,
                    costInUSD
                };
            });

            res.render("index", { currencies: currencies });
        })
        .catch((error) => {
            console.error("API error:", error);
            res.send("Failed to load exchange rates.");
        });
});

// Run app
app.listen(8080, function () {
    console.log("App is running on http://localhost:8080");
});
