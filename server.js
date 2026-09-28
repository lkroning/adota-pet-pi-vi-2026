const express = require("express");
const path = require("path");

const db = require("./src/database/connection");

const animalRoutes = require("./src/routes/animalRoutes");
const solicitacaoRoutes = require("./src/routes/solicitacaoRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/animais", animalRoutes);
app.use("/api/solicitacoes", solicitacaoRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});