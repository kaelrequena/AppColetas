import db from "../db.js";
import moment from "moment";

export default class manifestoService {
  static async buscarManifesto(placa) {
    return new Promise((aceito, rejeitado) => {
      var dataInicial = moment().add(-1, "day").format("YYYY-MM-DD 00:00:00");
      const dataFinal = moment().format("YYYY-MM-DD 23:59:59");
      const buscarData = `SELECT DISTINCT numero, manifestos.created_at, STATUS, COUNT(manifestos_notas.id) AS qnt_coletas
      FROM ccdblog.manifestos
      LEFT JOIN ccdblog.manifestos_notas ON manifestos_notas.manifesto_id = manifestos.id
      WHERE manifestos.created_at >= ? AND manifestos.created_at <= ? AND placa_veiculo = ? AND STATUS = 1
      LIMIT 31
      `;

      // Condição para ver se é SABADO, SEXTA, DOMINGO E SEGUNDA
      // function fimSemana() {
      //   const data = moment().day();
      //   return data === 0 || data === 6;
      // }

      // if(fimSemana() === 6){
      //   dataInicial = moment().add(-2,"day").format("YYYY-MM-DD 00:00:00");
      // }else if(fimSemana() === 0){
      //   dataInicial = moment().add()
      // }

      // if ((novaData - 2 + 7) % 7 === 6) {
      //   dataInicial = moment().subtract(2, "day").format("YYYY-MM-DD 00:00:00");
      // } else if ((novaData - 3 + 7) % 7 === 5) {
      //   dataInicial = moment().subtract(3, "day").format("YYYY-MM-DD 00:00:00");
      // } else if ((novaData - 1 + 7) % 7 === 0) {
      //   dataInicial = moment().subtract(1, "day").format("YYYY-MM-DD 00:00:00");
      // }

      db.query(
        // "SELECT DISTINCT  nrManifesto, dataManifesto FROM app_manifestos LIMIT 30 ",
        buscarData,
        [dataInicial, dataFinal, placa],

        (error, results) => {
          if (error) {
            rejeitado(error);
            return;
          }
          aceito(results);
        }
      );
    });
  }
}
