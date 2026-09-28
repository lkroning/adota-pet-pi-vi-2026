const db = require("../database/connection");

function buscarPorEmail(email) {
    return db.prepare(`
        SELECT *
        FROM administradores
        WHERE email = ?
    `).get(email);
}

module.exports = {
    buscarPorEmail
};