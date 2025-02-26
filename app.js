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

// app.listen(2024, () =>
//     console.log("listening and running on http://localhost:2024")
// );

/// // Route: /create-table => To create the tables
app.get("/create-table", (req, res) => {
    // Putting Query on a variable
    let name = `CREATE TABLE if not exists customers(
    customer_id int auto_increment,
    name VARCHAR(255) not null,
    PRIMARY KEY (customer_id)
    )`;

    let address = `CREATE TABLE if not exists address(
        address_id int auto_increment,
        customer_id int(11) not null,
        address VARCHAR(255) not null,
        PRIMARY KEY (address_id),
        FOREIGN KEY (customer_id) REFERENCES customers
        (customer_id)
    )`;

    let company = `CREATE TABLE if not exists company(
        company_id int auto_increment,
        customer_id int(11) not null,
        company VARCHAR(255) not null,
        PRIMARY KEY (company_id),
        FOREIGN KEY (customer_id) REFERENCES customers
        (customer_id)
    )`;

    connection.query(name, (err, results, fields) => {
        if (err) console.log(`Error Found: ${err}`);
    });

    connection.query(address, (err, results, fields) => {
        if (err) console.log(`Error Found: ${err}`);
    });

    connection.query(company, (err, results, fields) => {
        if (err) console.log(`Error found: ${err}`);
    });

    res.end("Tables Created");
    console.log("Tables Created");
});

app.listen(2024, () =>
    console.log("listening and running on http://localhost:2024")
);