const db = require("../database/connection");

function listarTodos() {
    return db.prepare(`
        SELECT *
        FROM animais
        ORDER BY id_animal DESC
    `).all();
}

function buscarPorId(id) {
    return db.prepare(`
        SELECT *
        FROM animais
        WHERE id_animal = ?
    `).get(id);
}

function criar(animal) {
    const resultado = db.prepare(`
        INSERT INTO animais
        (
            nome,
            especie,
            sexo,
            idade,
            porte,
            descricao,
            foto,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
        animal.nome,
        animal.especie,
        animal.sexo,
        animal.idade,
        animal.porte,
        animal.descricao,
        animal.foto,
        animal.status
    );

    return buscarPorId(resultado.lastInsertRowid);
}

function atualizar(id, animal) {
    const resultado = db.prepare(`
        UPDATE animais
        SET
            nome = ?,
            especie = ?,
            sexo = ?,
            idade = ?,
            porte = ?,
            descricao = ?,
            foto = ?,
            status = ?
        WHERE id_animal = ?
    `).run(
        animal.nome,
        animal.especie,
        animal.sexo,
        animal.idade,
        animal.porte,
        animal.descricao,
        animal.foto,
        animal.status,
        id
    );

    if (resultado.changes === 0) {
        return null;
    }

    return buscarPorId(id);
}

function excluir(id) {
    const resultado = db.prepare(`
        DELETE FROM animais
        WHERE id_animal = ?
    `).run(id);

    return resultado.changes > 0;
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    excluir
};