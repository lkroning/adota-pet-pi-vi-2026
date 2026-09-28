const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "../../database/adotapet.db");

const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

console.log("Banco de dados conectado!");

module.exports = db;