const fs = require("fs");
const path = require("path");

const db = require("./connection");

const schemaPath = path.join(
    __dirname,
    "../../database/schema.sql"
);

const schema = fs.readFileSync(
    schemaPath,
    "utf8"
);

db.exec(schema);

console.log(
    "Banco de dados inicializado com sucesso!"
);

db.close();