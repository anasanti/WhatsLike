/* Recebe a comunicação dos outros programas

Alunos: Ana Carolina Prates Santi e Igor Fraga de Andrade

16/11/2017*/

const knex = require('../database');
const validacao = require('../validacao');

const sincroniza = require('../comandos/servicos/sicroniza');
const mesagem = require('../comandos/servicos/mesagem');
const sicronizaRecebe = require('../comandos/servicos/sicronizaRecebe');

/*Recebe mensagem e guarda na base salvanda a data de reccebimento */
module.exports.comandos = (socket, pessoa) => {
    socket.on('mensagem', async (msg) => {
        mesagem(socket, pessoa, JSON.parse(msg));
    });

    /*Sincroniza as mensagens solicitada pelo usuario */
    socket.on('sincroniza', (msg) => {
        sincroniza(socket, pessoa, JSON.parse(msg));
    });

    socket.on('sicronizaRecebe', (msg) => {
        sicronizaRecebe(socket, pessoa, JSON.parse(msg));
    });

    socket.emit('sincroniza');

    setInterval(() => {
        socket.emit('sincroniza');
    }, 2000);
};