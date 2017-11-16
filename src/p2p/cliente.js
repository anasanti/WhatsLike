/* Realiza a comunicação para os outros programas

Alunos: Ana Carolina Prates Santi e Igor Fraga de Andrade

16/11/2017*/

const knex = require('../database');

module.exports.comandos = (socket, pessoa) => {
    
    /* Pega mensagens */
    socket.on('recupera-mensagens', async () => {
        const mensagens = await knex.select('id', 'data_hora_envio', 'data_hora_recebimento', 'id_grupo', 'mensagem')
            .from('mensagem')
            .where('id_destino', pessoa.id)
            .where('id_origem', 1);

        /*Sincroniza as mensagens */
        if (mensagens.length > 0) {
            socket.emit('sincroniza-mensagens', JSON.stringify(mensagens));
        }
    });
};