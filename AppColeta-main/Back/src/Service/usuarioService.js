import db from "../db.js";

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
