const knex = require('../database');

module.exports.comandos = (socket, pessoa) => {
    /*
    socket.on('mensagem', async (msg) => {
        const objeto = JSON.parse(msg);

        await knex('mensagem').insert({
            id_origem: pessoa.id,
            id_destino: 1,
            id_grupo: objeto.id_grupo,
            data_hora_envio: objeto.data_hora_envio,
            data_hora_recebimento: knex.raw('NOW()'),
            mensagem: objeto.mensagem, 
        });    
    });
    */
};