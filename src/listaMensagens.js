const knex = require('./database');


module.exports = async (nome) => {
  const mensagens = await knex.select('mensagem.id', 'mensagem.mensagem').from('mensagem')
    .join('pessoa', 'mensagem.id_origem', 'pessoa.id')
    .where('pessoa.nome', nome)
    .orderBy('data_hora_envio', 'desc');

    if (mensagens.length > 0) {
        mensagens.forEach((mensagen) => {
            console.log(mensagen.id + ': ' + mensagen.mensagem)
        });
    } else {
        console.log('Sem mensagens!');
    }
}