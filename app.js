const express = require("express");
const app = express();
const mysql = require("mysql2");

// // Midle ware to extract info from the html body name attribute
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => res.send("up and running..."));

// MySQL connection setup
const connection = mysql.createConnection({
    host: "localhost",
    user: "First-db",
    password: "First-db",
    database: "First-db",
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL");
});

// Route to create tables
app.get("/create-table", (req, res) => {
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
        FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    )`;

    let company = `CREATE TABLE if not exists company(
        company_id int auto_increment,
        customer_id int(11) not null,
        company VARCHAR(255) not null,
        PRIMARY KEY (company_id),
        FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
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

// Route to insert customers' information
app.post("/insert-customers-info", (req, res) => {
    console.table(req.body);  // Check if body is correct

    const { name, address, company } = req.body;  // Destructuring from req.body

    if (!name || !address || !company) {
        return res.status(400).send("Missing required fields");
    }

    let insertName = "INSERT INTO customers (name) VALUES (?)";
    let insertAddress = "INSERT INTO address (customer_id, address) VALUES (?, ?)";
    let insertCompany = "INSERT INTO company (customer_id, company) VALUES (?, ?)";

    connection.query(insertName, [name], (err, results, fields) => {
        if (err) console.log(`Error Found: ${err}`);
        console.table(results);

        const id = results.insertId;
        console.log("id from customer table to be used as a foreign key on the other tables >>>", id);

        connection.query(insertAddress, [id, address], (err, results, fields) => {
            if (err) console.log(`Error Found: ${err}`);
        });

        connection.query(insertCompany, [id, company], (err, results, fields) => {
            if (err) console.log(`Error Found: ${err}`);
        });
    });

    res.end("Data inserted successfully!");
    console.log("Data inserted successfully!");
});

app.listen(2024, () => console.log("listening and running on http://localhost:2024"));