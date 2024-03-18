// Antes
import express from "express";
import usuarioControllers from "../Controllers/usuarioControllers.js";
import manifestoControllers from "../Controllers/manifestoController.js";
import coletaController from "../Controllers/coletaControllers.js";

const router = express.Router();

// Rota com o metodo GET, pois estamos pegando os manifestos do banco
router.get("/manifestos/:placa", manifestoControllers.buscarManifestoPorUser);

// Rota com o metodo GET, pois estamos pegando os manifestos do banco
router.get("/coletas/:numManifesto", coletaController.buscarColetas);

//Rota com o metodo POST, pois estamos inserindo os dados no banco
router.post("/cadastro", usuarioControllers.cadastrar);

//Rota para comparar um EMAIL
router.post("/cadastro/emailConfirm", usuarioControllers.dadosConfirm);

//Rotas para atualizar dados, pois estamos utilizando o metodo PUT
router.put("/cadastro/atualizar");

//Rota para pegar apenas usuarios expecificos
router.get("/buscando/especifico");

// Rotas para deletar usuário
router.delete("/deletar");

export default router;

// // Depois
// import express from "express";
// const router = express.Router();

// // Importando o arquivo de controllers usando a sintaxe de import
// import * as arquivoControllers from "../Controllers/usuarioControllers.js";

// router.get("/usuarios", arquivoControllers.buscarTodos);

// export default router;
