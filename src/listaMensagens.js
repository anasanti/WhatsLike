const knex = require('./database');
const validacao = require('./validacao');

module.exports = async (nome) => {
    const pessoa = await knex.first('id').from('pessoa').where('nome', nome);

    if (pessoa === null) {
        console.log('Nenhum grupo ou pessoa com esse nome');
        return;
    }
    
    const dele = await knex.select('id', 'mensagem', 'id_destino', 'data_hora_envio', 'data_hora_recebimento', 'data_hora_leitura')
        .from('mensagem').where('id_origem', pessoa.id).where('id_destino', 1);

    const eu = await knex.select('id', 'mensagem', 'id_destino', 'data_hora_envio', 'data_hora_recebimento', 'data_hora_leitura')
        .from('mensagem').where('id_origem', 1).where('id_destino', pessoa.id);

    // junta os vetores de mensagens
    const mensagens = dele.concat(eu);
    
    /* Ordena vetor por data */
    mensagens.sort((a, b) => {
        return new Date(b.data_hora_envio) - new Date(a.data_hora_envio);
    });

    if (mensagens.length > 0) {
        const data = validacao.mysqlData();

        mensagens.forEach(async (mensagem) => {
            let msg = mensagem.id_destino > 1 ? 'eu' : nome; 

            msg += ': ' + mensagem.mensagem + ' | ' + mensagem.data_hora_envio;

            if (mensagem.data_hora_recebimento) {
                msg += ' | 1';
            } else {
                msg += ' | 0';
            }

            if (mensagem.data_hora_leitura) {
                msg += ' | 1';
            } else {
                msg += ' | 0';
            }

            console.log(msg);

            if (mensagem.data_hora_leitura === null && mensagem.id_destino === 1) {
                await knex('mensagem').update({
                    data_hora_leitura: data,
                }).where('id', mensagem.id);
            }
        });
    } else {
        console.log('Sem mensagens!');
    }
}