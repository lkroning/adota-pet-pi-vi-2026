const express = require("express");
const solicitacaoController = require("../controllers/solicitacaoController");

const router = express.Router();

router.post("/", solicitacaoController.criarSolicitacao);

router.get("/", solicitacaoController.listarSolicitacoes);

router.put("/:id/status", solicitacaoController.atualizarStatus);

module.exports = router;