/* Metodo para o envio de mensagem 

Alunos: Ana Carolina Prates Santi e Igor Fraga de Andrade

16/11/2017*/

/*Conexão com banco de dados*/
const knex = require('../database');
/*Conexão com a pasta validação*/ 
const validacao = require('../validacao');
/*Conexão com a pasta p2p */
const p2p = require('../p2p');

/*informando os dados que vai usar que foi denominado no index */
module.exports = async (nome, msg) => {

    /*fazendo a validação de mensagem e de nome que se encontra na pasta validação */
    delete msg[0];
    delete msg[1];
    msg = msg.join(' ').trim();
    if(validacao.validanome(nome) === false || validacao.validamensagem(msg) === false){
        return;
    }

    /*Query para buscar as pessoas para quem irá enviar as mensagens */
    const pessoa = await knex.select('id').from('pessoa').where('nome', nome).whereNot('id', 1);
    const grupo = await knex.select('pessoa.id', 'grupo.id as id_grupo')
        .from('grupo')
        .innerJoin('grupo_pessoa', 'grupo.id', 'grupo_pessoa.id_grupo')
        .innerJoin('pessoa', 'pessoa.id', 'grupo_pessoa.id_pessoa')
        .where('grupo.nome', nome)
        .whereNot('pessoa.id', 1);

    const registros = pessoa.concat(grupo);

    /*Realizando validação junto com o banco de dados */
    if (registros.length <= 0) {
        console.info('Nenhum grupo ou pessoa com esse nome');
        return;
    }

    /*Registra na base as mensagens */
    registros.forEach(async (registro) => {
        const data = validacao.mysqlData();

        await knex('mensagem').insert({
            id_origem: 1,
            id_destino: registro.id,
            id_grupo: registro.id_grupo || null,
            data_hora_envio: data,
            mensagem: msg, 
        });

        /* Tenta enviar a menssagem para todos os clientes */
        p2p.envia(pessoa.id, 'sicroniza');
    });

    console.info('Mensagem enviada');
}
