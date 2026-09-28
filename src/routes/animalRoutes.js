const express = require("express");
const animalController = require("../controllers/animalController");

const router = express.Router();

router.get("/", animalController.listarAnimais);

router.get("/:id", animalController.buscarAnimal);

router.post("/", animalController.criarAnimal);

router.put("/:id", animalController.atualizarAnimal);

router.delete("/:id", animalController.excluirAnimal);

module.exports = router;