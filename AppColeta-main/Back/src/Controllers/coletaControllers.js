import coletaService from "../Service/coletaService.js"; // Certifique-se de ajustar o caminho correto

export default class ColetaController {
  static async buscarColetas(req, res) {
    // let json = { error: "", result: [] };
    const coletasTratadas = [];

    try {
      const numManifesto = req.params.numManifesto; // Adicione esta linha para obter numManifesto da URL
      let coletas = await coletaService.buscarColeta(numManifesto);

      // isso daqui é o objeto que eu estou montando que vai retornar para o front
      for (let i in coletas) {
        coletasTratadas.push({
          produto: coletas[i].descricao_produto
            ? coletas[i].descricao_produto
            : "Produto não encontrado",
          rua: coletas[i].logradouro,
          numeroCasa: coletas[i].numero,
          bairro: coletas[i].bairro_nome,
          cidade: coletas[i].cidade_nome,
          uf: coletas[i].sigla,
          numColetas: coletas[i].manifesto_id,
          dataColetas: coletas[i].created_at,
        });
      }

      // aqui eu retorno o array para front
      res.status(200).send(coletasTratadas);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Erro na coletaController",
      });
    }
  }
}

// ARRUMAR O COLETAR

// import coletaService from "../Service/coletaService.js"; // Certifique-se de ajustar o caminho correto

// export default class ColetaController {
//   static async buscarColetas(req, res) {
//     let json = { error: "", result: [] };

//     try {
//       let coletas = await coletaService.buscarColeta(numManifesto);
//       for (let i in coletas) {
//         json.result.push({
//           nrColetas: coletas[i].chave_nf,
//           dataColetas: coletas[i].created_at,
//         });
//       }
//       res.json(json);
//     } catch (error) {
//       json.error = error.message || "Ocorreu um erro na busca de coletas.";
//       res.status(500).json(json);
//     }
//   }
// }
