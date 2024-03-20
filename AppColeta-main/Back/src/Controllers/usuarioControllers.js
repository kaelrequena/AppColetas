import usuarioService from "../Service/usuarioService.js";
import { send } from "../utils/mail.js";

export default class usuarioControllers {
  // Função de Cadastro
  static async cadastrar(req, res) {
    try {
      console.log(req.body);

      const nomeCompleto = req.body.nomeCompleto;
      const placaVeiculo = req.body.placaVeiculo;
      const carteiraMotorista = req.body.carteiraMotorista;
      const celUm = req.body.celUm;
      const celDois = req.body.celDois;
      const email = req.body.email;
      const senha = req.body.senha;

      const usuarioCriado = await usuarioService.cadastrarUsuario(
        nomeCompleto,
        placaVeiculo,
        carteiraMotorista,
        celUm,
        celDois,
        email,
        senha
      );

      if (!usuarioCriado) {
        res.status(400).send({
          message: "Falha ao criar Usuário",
        });
        return;
      }

      //  recebendo a resposta
      res.json({
        statusCode: 200,
        message: "usuario cadastrado com sucesso",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Erro na api",
      });
    }
  }

  static async dadosConfirm(req, res) {
    try {
      const email = req.body.email;
      const placa = req.body.placa;
      const senha = req.body.senha;
      const usuario = await usuarioService.confirmarUsuario(
        email,
        placa,
        senha
      );

      if (!usuario) {
        res.status(404).send({
          message: "Não encontrado",
        });
        return;
      }

      // Adicionando uma resposta de sucesso, se necessário
      res.status(200).send(usuario);
    } catch (error) {
      console.log(error);

      // Adicionando uma resposta de erro
      res.status(500).send({
        message: "Erro na API",
      });
    }
  }
  static async confirmEmail(req, res) {
    const email = req.params.email;
    const verificandoEmail = await usuarioService.confirmarEmail(email);
    if (!verificandoEmail) {
      res.status(404).send({
        message: "Usuario não encontrado",
      });
      return;
    } else {
      console.log(verificandoEmail);
      let token = "";
      for (let i = 0; i < 4; i++) {
        token += Math.floor(Math.random() * 10);
      }

      await usuarioService.tokenCadastrando(token, verificandoEmail.id);

      await send(
        email,
        "teste blabla",
        `<p>
      <i>teste deu certo</i>
      <a>${token}</a>
      <p>${email}</p>
      </p>`
      );
      res.status(200).json(verificandoEmail);
    }
  }
  catch(error) {
    console.log(error);
    res.status().send({
      message: "erro na api",
    });
  }

  static async tokenConfirm(req, res) {
    const { token, id } = req.body;
    const tokenConfirmando = await usuarioService.verificandoToken(token, id);
    if (!tokenConfirmando) {
      res.status(404).send({
        message: "TOKEN INVALIDO",
      });
      return;
    } else {
      res.status(200).send(tokenConfirmando);
    }
  }
}
