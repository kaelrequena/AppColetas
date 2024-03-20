import db from "../db.js";
import moment from "moment";

export default class manifestoService {
  static async buscarManifesto(placa) {
    return new Promise((aceito, rejeitado) => {
      const dataInicial = moment().add(-1, "day").format("YYYY-MM-DD 00:00:00");
      const dataFinal = moment().format("YYYY-MM-DD 23:59:59");
      const buscarData = `SELECT DISTINCT numero, manifestos.created_at, STATUS, COUNT(manifestos_notas.id) AS qnt_coletas
      FROM ccdblog.manifestos
      LEFT JOIN ccdblog.manifestos_notas ON manifestos_notas.manifesto_id = manifestos.id
      WHERE manifestos.created_at >= ? AND manifestos.created_at <= ? AND placa_veiculo = ? AND STATUS = 1
      LIMIT 31
      `;

      // BACKUP
      // `SELECT DISTINCT numero, manifestos.created_at, STATUS, COUNT(manifestos_notas.id) AS qnt_coletas
      // FROM ccdblog.manifestos
      // LEFT JOIN ccdblog.manifestos_notas ON manifestos_notas.manifesto_id = manifestos.id
      // WHERE manifestos.created_at >= ? AND manifestos.created_at <= ? AND placa_veiculo = ? AND STATUS = 1
      // GROUP BY manifestos_notas.manifesto_id ORDER BY created_at DESC`;

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
