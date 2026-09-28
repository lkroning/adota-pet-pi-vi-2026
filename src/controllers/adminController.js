const bcrypt = require("bcryptjs");
const adminModel = require("../models/adminModel");

async function login(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                erro: "Informe o e-mail e a senha."
            });
        }

        const administrador =
            adminModel.buscarPorEmail(email);

        if (!administrador) {
            return res.status(401).json({
                erro: "E-mail ou senha inválidos."
            });
        }

        const senhaValida =
            await bcrypt.compare(
                senha,
                administrador.senha
            );

        if (!senhaValida) {
            return res.status(401).json({
                erro: "E-mail ou senha inválidos."
            });
        }

        res.json({
            mensagem: "Login realizado com sucesso.",

            administrador: {
                id_admin: administrador.id_admin,
                nome: administrador.nome,
                email: administrador.email
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: "Erro ao realizar login."
        });
    }
}

module.exports = {
    login
};