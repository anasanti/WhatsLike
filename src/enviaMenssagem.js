/* Metodo para o envio de mensagem 

Alunos: Ana Carolina Prates Santi e Igor Fraga de Andrade

16/11/2017*/

/*Conexão com banco de dados*/
const knex = require('./database');
/*Conexão com a pasta validação*/ 
const validacao = require('./validacao');
/*Conexão com a pasta p2p */
const p2p = require('./p2p');

/*informando os dados que vai usar que foi denominado no index */
module.exports = (nome, msg) => {

    /*fazendo a validação de mensagem e de nome que se encontra na pasta validação */
    delete msg[0];
    delete msg[1];
    msg = msg.join(' ').trim();
    if(validacao.validanome(nome) === false || validacao.validamensagem(msg) === false){
        return;
    }

    /*Query para buscar as pessoas para quem irá enviar as mensagens */
    const sql = `
        (
            SELECT pessoa.id, NULL as grupo_id FROM pessoa
                WHERE id != 1 AND nome = ?
        ) UNION (
            SELECT pessoa.id, grupo.id as grupo_id FROM grupo
            INNER JOIN grupo_pessoa ON grupo.id = grupo_pessoa.id_grupo
            INNER JOIN pessoa ON pessoa.id = grupo_pessoa.id_pessoa
        WHERE pessoa.id != 1 AND grupo.nome = ?
        )
    `;

    /*Realizando validação junto com o banco de dados */
    knex.raw(sql, [nome, nome]).then(([registros]) => {
        if (registros.length <= 0) {
            console.log('Nenhum grupo ou pessoa com esse nome');
            return;
        }

        /*Registra na base as mensagens */
        registros.forEach(async (registro) => {
            const data = validacao.mysqlData();

            await knex('mensagem').insert({
                id_origem: 1,
                id_destino: registro.id,
                id_grupo: registro.id_grupo,
                data_hora_envio: data,
                mensagem: msg, 
            });

            /* Tenta enviar a menssagem para todos os clientes*/
            p2p.envia(registro.id, 'mensagem', {
                mensagem: msg,
                data_hora_envio: data,
                id_grupo: registro.id_grupo,
            });
        });

        console.log('Mensagem enviada');
    });
}
