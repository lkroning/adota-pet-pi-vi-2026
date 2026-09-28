const db = require("../database/connection");

function criarSolicitacao(dados) {
    const adotanteExistente = db.prepare(`
        SELECT id_adotante
        FROM adotantes
        WHERE email = ?
    `).get(dados.email);

    let idAdotante;

    if (adotanteExistente) {
        idAdotante = adotanteExistente.id_adotante;

        db.prepare(`
            UPDATE adotantes
            SET nome = ?, telefone = ?, cidade = ?
            WHERE id_adotante = ?
        `).run(
            dados.nome,
            dados.telefone,
            dados.cidade,
            idAdotante
        );

    } else {
        const resultado = db.prepare(`
            INSERT INTO adotantes
            (nome, email, telefone, cidade)
            VALUES (?, ?, ?, ?)
        `).run(
            dados.nome,
            dados.email,
            dados.telefone,
            dados.cidade
        );

        idAdotante = resultado.lastInsertRowid;
    }

    const resultadoSolicitacao = db.prepare(`
        INSERT INTO solicitacoes
        (id_animal, id_adotante, mensagem)
        VALUES (?, ?, ?)
    `).run(
        dados.id_animal,
        idAdotante,
        dados.mensagem
    );

    return {
        id_solicitacao: resultadoSolicitacao.lastInsertRowid
    };
}

function listarTodas() {
    return db.prepare(`
        SELECT
            s.id_solicitacao,
            s.id_animal,
            s.id_adotante,
            s.data_solicitacao,
            s.mensagem,
            s.status,
            a.nome AS animal_nome,
            ad.nome AS adotante_nome,
            ad.email AS adotante_email,
            ad.telefone AS adotante_telefone,
            ad.cidade AS adotante_cidade
        FROM solicitacoes s
        INNER JOIN animais a
            ON s.id_animal = a.id_animal
        INNER JOIN adotantes ad
            ON s.id_adotante = ad.id_adotante
        ORDER BY s.id_solicitacao DESC
    `).all();
}

function atualizarStatus(id, status) {
    const resultado = db.prepare(`
        UPDATE solicitacoes
        SET status = ?
        WHERE id_solicitacao = ?
    `).run(status, id);

    if (resultado.changes === 0) {
        return null;
    }

    return db.prepare(`
        SELECT
            s.id_solicitacao,
            s.id_animal,
            s.id_adotante,
            s.data_solicitacao,
            s.mensagem,
            s.status,
            a.nome AS animal_nome,
            ad.nome AS adotante_nome,
            ad.email AS adotante_email,
            ad.telefone AS adotante_telefone,
            ad.cidade AS adotante_cidade
        FROM solicitacoes s
        INNER JOIN animais a
            ON s.id_animal = a.id_animal
        INNER JOIN adotantes ad
            ON s.id_adotante = ad.id_adotante
        WHERE s.id_solicitacao = ?
    `).get(id);
}

module.exports = {
    criarSolicitacao,
    listarTodas,
    atualizarStatus
};