const knex = require('./database');
const validacao = require('./validacao');
const p2p = require('./p2p');

module.exports = (nome, msg) => {

    if(validacao.validanome(nome) === false || validacao.validamensagem(msg) === false){
        return;
    }

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

    knex.raw(sql, [nome, nome]).then(([registros]) => {
        if (registros.length <= 0) {
            console.log('Nenhum grupo ou pessoa com esse nome');
            return;
        }

        registros.forEach(async (registro) => {
            const data = validacao.mysqlData();

            await knex('mensagem').insert({
                id_origem: 1,
                id_destino: registro.id,
                id_grupo: registro.id_grupo,
                data_hora_envio: data,
                mensagem: msg, 
            });

            // Tenta enviar a menssagem para todos os clientes
            p2p.envia(registro.id, 'mensagem', {
                mensagem: msg,
                data_hora_envio: data,
                id_grupo: registro.id_grupo,
            });
        });

        console.log('Mensagem enviada');
    });
}
