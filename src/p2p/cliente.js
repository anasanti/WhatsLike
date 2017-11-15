const knex = require('../database');

module.exports.comandos = (socket, pessoa) => {
    
    /* Pega mensagens */
    socket.on('recupera-mensagens', async () => {
        const mensagens = await knex.select('id', 'data_hora_envio', 'data_hora_recebimento', 'id_grupo', 'mensagem')
            .from('mensagem')
            .where('id_destino', pessoa.id)
            .where('id_origem', 1);

        if (mensagens.length > 0) {
            socket.emit('sincroniza-mensagens', JSON.stringify(mensagens));
        }
    });
};