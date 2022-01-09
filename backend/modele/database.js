// import module Dotenv pour les varibales d'environnement
require("dotenv").config();

// connection base de donnée mySQL
const mysql2= require('mysql2');



const db = mysql2.createConnection({
  host     : process.env.MySQL_HOST,
  user     : process.env.MySQL_USER,
  password : process.env.MySQL_PASS,
  database : process.env.MySQL_DATABASE
});

module.exports =db;