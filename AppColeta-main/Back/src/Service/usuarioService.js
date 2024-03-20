import db from "../db.js";
import moment from "moment";
// const moment = require("moment");

export default class usuarioService {
  static async cadastrarUsuario(
    nomeCompleto,
    placaVeiculo,
    carteiraMotorista,
    celUm,
    celDois,
    email,
    senha
  ) {
    try {
      const resposta = await new Promise((resolve, reject) => {
        // Use connection.query para executar uma consulta no MySQL
        db.query(
          "INSERT INTO Usuarios (nomeCompleto,placaVeiculo,carteiraMotorista,celPrimario,celSegundario,email,senha) VALUES (?,?,?,?,?,?,?)",
          [
            nomeCompleto,
            placaVeiculo,
            carteiraMotorista,
            celUm,
            celDois,
            email,
            senha,
          ],

          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      });

      console.log(resposta);
      return resposta;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async tokenCadastrando(token, id) {
    return new Promise((resolve, reject) => {
      try {
        const dataAtual = moment().format("YYYY-MM-DD HH:mm:ss");
        db.query(
          "INSERT INTO token_Usuario (token, id_Usuario, data_criacao) VALUES (?,?,?)",
          [token, id, dataAtual],
          (error, results) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(true);
          }
        );
      } catch (error) {}
    });
  }

  static async bancoVerificar(email) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT Usuarios.email, Usuarios.id FROM ccdblog_app_coletas.Usuarios WHERE email=?`,
        [email],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(false);
          }
        }
      );
    });
  }

  static async verificandoToken(token, id) {
    return new Promise((resolve, reject) => {
      try {
        db.query(
          "SELECT * FROM token_Usuario WHERE id_Usuario =? AND token = ? ORDER BY data_criacao DESC",
          [id, token],
          (error, results) => {
            if (error) {
              reject(error);
              return;
            }
            if (results.length <= 0) {
              resolve(false);
              return;
            }

            const verificaTempo = moment().diff(
              results[0].data_criacao,
              "minute"
            );
            if (verificaTempo <= 10) {
              resolve(true);
              return;
            } else {
              resolve(false);
            }
          }
        );
      } catch (error) {
        reject(error); // Rejeitar se houver um erro no bloco try
      }
    });
  }

  static async buscar(placaVeiculo, email) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM Usuarios WHERE placaVeiculo =? AND email=?",
        [placaVeiculo, email],

        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(false);
          }
        }
      );
    });
  }

  static async confirmarUsuario(email, placaVeiculo, senha) {
    return new Promise(async (resolve, reject) => {
      let usuarioService = await this.buscar(placaVeiculo, email, senha);
      if (!usuarioService) {
        resolve();
        return;
      }
      if (usuarioService) {
        resolve({
          id: usuarioService.id,
          nomeCompleto: usuarioService.nomeCompleto,
          placaVeiculo: usuarioService.placaVeiculo,
          carteiraMotorista: usuarioService.carteiraMotorista,
          celPrimario: usuarioService.celPrimario,
          celSegundario: usuarioService.celSegundario,
          email: usuarioService.email,
        });
        return;
      }
    });
  }

  static async confirmarEmail(email) {
    return new Promise(async (resolve, reject) => {
      let confirmEmail = await this.bancoVerificar(email);
      if (confirmEmail) {
        resolve(confirmEmail);
      } else {
        resolve(false);
      }
      return;
    });
  }

  // deletar: async () => {
  //   return new Promise((aceito, rejeitado) => {
  //     const deletandoUser = "DELETE FROM Usuarios";
  //     db.query(deletandoUser, (error, results) => {
  //       if (error) {
  //         rejeitado(error);
  //         return;
  //       }
  //       aceito(results);
  //     });
  //   });
  // },
}
