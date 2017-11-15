const knex = require('../database');
const validacao = require('../validacao');

module.exports.comandos = (socket, pessoa) => {
    socket.on('mensagem', async (msg) => {
        const objeto = JSON.parse(msg);
        const data = validacao.mysqlData();

        await knex('mensagem').insert({
            id_origem: pessoa.id,
            id_destino: 1,
            id_grupo: objeto.id_grupo,
            data_hora_envio: objeto.data_hora_envio,
            data_hora_recebimento: data,
            mensagem: objeto.mensagem, 
        });
    });

    socket.on('sincroniza-mensagens', async (msg) => {
        const mensagens = JSON.parse(msg);
        const data = validacao.mysqlData();

        for (let i = 0; i < mensagens.length; i++) {
            const mensagem = await knex.first('id', 'data_hora_recebimento', 'data_hora_leitura')
                .from('mensagem')
                .where('data_hora_envio', mensagens[i].data_hora_envio);

            if (mensagem) {
                const dados = {};

                if (mensagem.data_hora_recebimento === null) {
                    dados.data_hora_recebimento = data;
                }

                if (mensagem.data_hora_leitura === null && mensagens[i].data_hora_leitura) {
                    dados.data_hora_leitura = mensagens[i].data_hora_leitura;
                }

                if (dados.data_hora_recebimento || dados.data_hora_leitura) {
                    await knex('mensagem').update(dados).where('id', mensagem.id);
                }
            } else {
                await knex('mensagem').insert({
                    id_origem: pessoa.id,
                    id_destino: 1,
                    id_grupo: mensagens[i].id_grupo,
                    data_hora_envio: mensagens[i].data_hora_envio,
                    data_hora_recebimento: data,
                    mensagem: mensagens[i].mensagem, 
                });
            }
        };
    });

    socket.emit('recupera-mensagens');
};