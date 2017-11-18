const knex = require('../../database');
const validacao = require('../../validacao');

module.exports = async (socket, pessoa, dados) => {
    const data = validacao.mysqlData();
    await knex('mensagem').insert({
        id_origem: pessoa.id,
        id_destino: 1,
        id_grupo: dados.id_grupo || null,
        data_hora_envio: dados.data_hora_envio,
        data_hora_recebimento: data,
        mensagem: dados.mensagem, 
    });
};
