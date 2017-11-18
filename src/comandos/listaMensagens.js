/* Lista as mensagens enviadas pelos usarios

Alunos: Ana Carolina Prates Santi e Igor Fraga de Andrade

16/11/2017*/
const Table = require('cli-table');
const knex = require('../database');
const validacao = require('../validacao');
const p2p = require('../p2p');

module.exports = async (nome) => {
    const pessoa = await knex.first('id').from('pessoa').where('nome', nome || '');

    if (!pessoa) {
        console.info('Nenhum grupo ou pessoa com esse nome');
        return;
    }
    
    /*Mensagens que enviadas pelo contato */
    const dele = await knex.select('id', 'mensagem', 'id_destino', 'data_hora_envio', 'data_hora_recebimento', 'data_hora_leitura')
        .from('mensagem').where('id_origem', pessoa.id).where('id_destino', 1);

    /*Mensagens enviadas para o contato */
    const eu = await knex.select('id', 'mensagem', 'id_destino', 'data_hora_envio', 'data_hora_recebimento', 'data_hora_leitura')
        .from('mensagem').where('id_origem', 1).where('id_destino', pessoa.id);

    // junta os vetores de mensagens
    const mensagens = dele.concat(eu);
    
    /* Ordena vetor por data */
    mensagens.sort((a, b) => {
        return new Date(b.data_hora_envio) - new Date(a.data_hora_envio);
    });

    if (mensagens.length > 0) {
        const table = new Table({
            head: [
                'Nome',
                'Mensagem',
                'Hora de envio',
                'Hora recebimento',
                'Hora leitura',
            ],
        });
        const data = validacao.mysqlData();
        console.info();

        /*Informa para que a mensagem será enviada */
        mensagens.forEach(async (mensagem) => {
            const linha = [];
            linha.push(mensagem.id_destino > 1 ? global.pessoa.nome : nome); 

            /*Demonstra a hora da criação do envio da mensagem */
            linha.push(mensagem.mensagem);
            linha.push(mensagem.data_hora_envio);

            /*Demonstra a se a mensagem foi recebida */
            if (mensagem.data_hora_recebimento) {
                linha.push(mensagem.data_hora_recebimento);
            } else {
                linha.push('');
            }

            /*Demonstra se a mensagem foi lida*/
            if (mensagem.data_hora_leitura) {
                linha.push(mensagem.data_hora_leitura);
            } else {
                linha.push('');
            }

            table.push(linha);

            /*=== identico = true == comparação
            Marca as mensagens do contato como lida */
            if (mensagem.data_hora_leitura === null && mensagem.id_destino === 1) {
                await knex('mensagem').update({
                    data_hora_leitura: data,
                }).where('id', mensagem.id);
            }

            /* Envia pedido de sicronia para o contato que foi listado */
            p2p.envia(pessoa.id, 'sicroniza');
        });

        console.info(table.toString());
    } else {
        console.info('Sem mensagens!');
    }
}