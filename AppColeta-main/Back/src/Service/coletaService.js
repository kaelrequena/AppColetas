import db from "../db.js";

export default class ColetaService {
  static async buscarColeta(numManifesto) {
    return new Promise((aceito, rejeitado) => {
      const query = `SELECT 
      manifestos.numero, 
      manifestos.placa_veiculo,
      manifestos.status,
      manifestos_notas.manifesto_id,
      manifestos.created_at, 
      produtos.descricao_produto, 
      enderecos.logradouro, 
      enderecos.numero, 
      enderecos.complemento, 
      bairros.nome AS bairro_nome, 
      cidades.nome AS cidade_nome, 
      ufs.sigla 
     
     FROM ccdblog.manifestos
     
     left JOIN ccdblog.manifestos_notas ON manifestos.id = manifestos_notas.manifesto_id
     left JOIN ccdblog.coletas ON coletas.chave_nf = manifestos_notas.chave_nf
     left JOIN ccdblog.coleta_produtos ON coleta_produtos.nf_id = coletas.id
     left JOIN ccdblog.produtos ON produtos.cod_produto = coleta_produtos.cod_produto 
     left JOIN ccdblog.enderecos ON enderecos.id = coletas.end_origem_id
     left JOIN ccdblog.bairros ON bairros.id = enderecos.bairro_id
     left JOIN ccdblog.cidades ON cidades.id = bairros.cidade_id
     left JOIN ccdblog.ufs ON ufs.id = cidades.uf_id
     
     WHERE manifestos.status = 1 AND manifestos.numero = ?`;
      db.query(query, [numManifesto], (error, results) => {
        if (error) {
          rejeitado(error);
          return;
        }
        aceito(results);
      });
    });
  }
}

// import db from "../db.js";
// import moment from "moment";

// export default class ColetaService {
//   static async buscarColeta(numManifesto) {
//     return new Promise((aceito, rejeitado) => {
//       db.query(
//         "SELECT produtos.descricao_produto, enderecos.logradouro, enderecos.numero, enderecos.complemento, bairros.nome AS bairro_nome, cidades.nome, ufs.sigla FROM  manifestos_notas   JOIN coletas ON coletas.chave_nf = manifestos_notas.chave_nf  JOIN coleta_produtos ON coleta_produtos.nf_id = coletas.id  JOIN produtos ON produtos.cod_produto = coleta_produtos.cod_produto  JOIN enderecos ON enderecos.id = coletas.end_origem_id  JOIN bairros ON bairros.id = enderecos.bairro_id  JOIN cidades ON cidades.id = bairros.cidade_id  JOIN ufs ON ufs.id = cidades.uf_id WHERE manifesto_id=",
//         (error, results) => {
//           if (error) {
//             rejeitado(error);
//             return;
//           }
//           aceito(results);
//         }
//       );
//     });
//   }
// }
