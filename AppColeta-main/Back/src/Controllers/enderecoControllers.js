const enderecos = require("../Service/enderecoService");

module.exports = {
  buscarEnderecos: async (req, res) => {
    const json = { error: "", result: [] };

    const endereco = await enderecos.buscarEnderecos();
    for (let i in endereco) {
      json.result.push({
        rua: endereco[i].logradouro,
        numero: endereco[i].numero,
        complemento: endereco[i].complemento,
      });
    }
  },
};
