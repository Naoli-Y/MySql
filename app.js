const express = require("express");
const app = express();
const mysql = require("mysql2");

app.get("/", (req, res) => res.send("up and running..."));

// User account info
const connection = mysql.createConnection({
    host: "localhost", // Corrected hostname
    user: "First-db", // Verify these credentials
    password: "First-db", // Verify these credentials
    database: "First-db", // Verify these credentials
    //socketPath: "", // Only needed if you are using a socket, and not a port.
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err); // Improved error logging
        return; // Stop execution if connection fails
    }
    console.log("Connected to MySQL");
});

app.listen(2024, () =>
    console.log("listening and running on http://localhost:2024")
);