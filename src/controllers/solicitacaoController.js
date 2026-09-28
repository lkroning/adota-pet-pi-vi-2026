const solicitacaoModel = require("../models/solicitacaoModel");

function criarSolicitacao(req, res) {
    try {
        const {
            id_animal,
            nome,
            email,
            telefone,
            cidade,
            mensagem
        } = req.body;

        if (
            !id_animal ||
            !nome ||
            !email ||
            !telefone ||
            !cidade
        ) {
            return res.status(400).json({
                erro: "Preencha todos os campos obrigatórios."
            });
        }

        const resultado = solicitacaoModel.criarSolicitacao({
            id_animal,
            nome,
            email,
            telefone,
            cidade,
            mensagem
        });

        res.status(201).json({
            mensagem: "Solicitação registrada com sucesso.",
            id_solicitacao: resultado.id_solicitacao
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao registrar solicitação."
        });
    }
}

function listarSolicitacoes(req, res) {
    try {
        const solicitacoes = solicitacaoModel.listarTodas();

        res.json(solicitacoes);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao buscar solicitações."
        });
    }
}

function atualizarStatus(req, res) {
    try {
        const { status } = req.body;

        const statusPermitidos = [
            "Pendente",
            "Em análise",
            "Aprovada",
            "Recusada"
        ];

        if (!statusPermitidos.includes(status)) {
            return res.status(400).json({
                erro: "Status inválido."
            });
        }

        const solicitacao =
            solicitacaoModel.atualizarStatus(
                req.params.id,
                status
            );

        if (!solicitacao) {
            return res.status(404).json({
                erro: "Solicitação não encontrada."
            });
        }

        res.json(solicitacao);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao atualizar solicitação."
        });
    }
}

module.exports = {
    criarSolicitacao,
    listarSolicitacoes,
    atualizarStatus
};