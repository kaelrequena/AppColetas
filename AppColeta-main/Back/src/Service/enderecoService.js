const db = require("../db.js");

module.exports = {
  buscarEnderecos: () => {
    return new Promise((aceito, rejeitado) => {
      db.query("SELECT logradouro,numero,complemento FROM enderecos");
    });
  },
};
