import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import arquivoDasRotas from "./Routers/routers.js";

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use("/api", arquivoDasRotas);

server.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando em: http://192.168.1.113:${process.env.PORT}`);
});
