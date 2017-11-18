const knex = require('../../database');
const validacao = require('../../validacao');

const eu = async (pessoa, data, mensagens) => {
    if (mensagens.length === 0) {
        return;
    }

    for (let i = 0; i < mensagens.length; i++) {
        const mensagem = await knex.first('id', 'data_hora_recebimento', 'data_hora_leitura')
            .from('mensagem')
            .where('data_hora_envio', mensagens[i].data_hora_envio);

        if (mensagem) {
            const dados = {};

            if (mensagem.data_hora_recebimento === null) {
                dados.data_hora_recebimento = data;
            }

            if (mensagens[i].data_hora_recebimento) {
                dados.data_hora_recebimento = mensagens[i].data_hora_recebimento;
            }

            if (mensagens[i].data_hora_leitura) {
                dados.data_hora_leitura = mensagens[i].data_hora_leitura;
            }

            if (dados.data_hora_recebimento || dados.data_hora_leitura) {
                await knex('mensagem').update(dados).where('id', mensagem.id);
            }
        }
    }
};

const ele = async (pessoa, data, mensagens) => {
    if (mensagens.length === 0) {
        return;
    }

    for (let i = 0; i < mensagens.length; i++) {
        const mensagem = await knex.first('id', 'data_hora_recebimento', 'data_hora_leitura')
            .from('mensagem')
            .where('data_hora_envio', mensagens[i].data_hora_envio);

        if (mensagem) {
            const dados = {};

            if (mensagem.data_hora_recebimento === null) {
                dados.data_hora_recebimento = data;
            }

            if (mensagens[i].data_hora_recebimento) {
                dados.data_hora_recebimento = mensagens[i].data_hora_recebimento;
            }

            if (mensagens[i].data_hora_leitura) {
                dados.data_hora_leitura = mensagens[i].data_hora_leitura;
            }

            if (dados.data_hora_recebimento || dados.data_hora_leitura) {
                await knex('mensagem').update(dados).where('id', mensagem.id);
            }
        } else {
            await knex('mensagem').insert({
                id_origem: pessoa.id,
                id_destino: 1,
                id_grupo: mensagens[i].id_grupo || null,
                data_hora_envio: mensagens[i].data_hora_envio,
                data_hora_recebimento: data,
                mensagem: mensagens[i].mensagem, 
            });
        }
    }
}


module.exports = async (socket, pessoa, dados) => {
    const data = validacao.mysqlData();

    eu(pessoa, data, dados.eu);
    ele(pessoa, data, dados.ele);
};