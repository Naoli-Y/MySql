const express = require("express");
const app = express();
const mysql = require("mysql2");


app.get("/", (req, res) => res.send("up and running..."));



app.listen(2024, () => 
console.log("listening and running on http://localhost:2024")
);
