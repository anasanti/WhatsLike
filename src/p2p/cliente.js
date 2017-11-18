/* Realiza a comunicação para os outros programas

Alunos: Ana Carolina Prates Santi e Igor Fraga de Andrade

16/11/2017*/

const knex = require('../database');
const sincroniza = require('../comandos/servicos/sicroniza');
const mesagem = require('../comandos/servicos/mesagem');
const sicronizaRecebe = require('../comandos/servicos/sicronizaRecebe');

module.exports.comandos = (socket, pessoa) => {
    socket.on('mensagem', async (msg) => {
        mesagem(socket, pessoa, JSON.parse(msg));
    });

    socket.on('sincroniza', () => {
        sincroniza(socket, pessoa);
    });

    socket.on('sicronizaRecebe', (msg) => {
        sicronizaRecebe(socket, pessoa, JSON.parse(msg));
    });
};