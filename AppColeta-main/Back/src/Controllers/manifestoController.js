import UsuarioService from "../Service/manifestoService.js";
export default class manifestoControllers {
  static async buscarManifestoPorUser(req, res) {
    const placa = req.params.placa;
    let json = { error: "", result: [] };
    let manifestos = await UsuarioService.buscarManifesto(placa);

    for (let i in manifestos) {
      json.result.push({
        nrManifesto: manifestos[i].numero,
        dataManifesto: manifestos[i].created_at,
        qntColetas: manifestos[i].qnt_coletas,
      });
    }

    res.json(json);
  }
}
