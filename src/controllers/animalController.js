const animalModel = require("../models/animalModel");

function listarAnimais(req, res) {
    try {
        const animais = animalModel.listarTodos();

        res.json(animais);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: "Erro ao buscar animais."
        });
    }
}

function buscarAnimal(req, res) {
    try {
        const animal = animalModel.buscarPorId(req.params.id);

        if (!animal) {
            return res.status(404).json({
                erro: "Animal não encontrado."
            });
        }

        res.json(animal);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: "Erro ao buscar animal."
        });
    }
}

function criarAnimal(req, res) {
    try {

        const {
            nome,
            especie,
            sexo,
            idade,
            porte,
            descricao,
            foto,
            status
        } = req.body;

        if (
            !nome ||
            !especie ||
            !sexo ||
            idade === undefined ||
            !porte
        ) {
            return res.status(400).json({
                erro: "Preencha todos os campos obrigatórios."
            });
        }

        const animal = animalModel.criar({
            nome,
            especie,
            sexo,
            idade,
            porte,
            descricao: descricao || "",
            foto: foto || "",
            status: status || "Disponível"
        });

        res.status(201).json(animal);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: "Erro ao cadastrar animal."
        });
    }
}

function atualizarAnimal(req, res) {
    try {

        const {
            nome,
            especie,
            sexo,
            idade,
            porte,
            descricao,
            foto,
            status
        } = req.body;

        if (
            !nome ||
            !especie ||
            !sexo ||
            idade === undefined ||
            !porte ||
            !status
        ) {
            return res.status(400).json({
                erro: "Preencha todos os campos obrigatórios."
            });
        }

        const animal = animalModel.atualizar(
            req.params.id,
            {
                nome,
                especie,
                sexo,
                idade,
                porte,
                descricao: descricao || "",
                foto: foto || "",
                status
            }
        );

        if (!animal) {
            return res.status(404).json({
                erro: "Animal não encontrado."
            });
        }

        res.json(animal);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: "Erro ao atualizar animal."
        });
    }
}

function excluirAnimal(req, res) {
    try {

        const excluido = animalModel.excluir(
            req.params.id
        );

        if (!excluido) {
            return res.status(404).json({
                erro: "Animal não encontrado."
            });
        }

        res.json({
            mensagem: "Animal excluído com sucesso."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: "Erro ao excluir animal."
        });
    }
}

module.exports = {
    listarAnimais,
    buscarAnimal,
    criarAnimal,
    atualizarAnimal,
    excluirAnimal
};