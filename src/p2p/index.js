/* Realiza a trocca de mensagens entre os programas

Alunos: Ana Carolina Prates Santi e Igor Fraga de Andrade

16/11/2017*/

const knex = require('../database');
const cliente = require('./cliente');
const servidor = require('./servidor');

const conectados = {};

/* Tenta conectar nos outros usuários */
const listaServidores = async (ioc) => { 
    const pessoas = await knex.select('id', 'nome', 'ip').from('pessoa').whereNot('id', 1);

    for (let i = 0; i < pessoas.length; i++) {
        if (typeof conectados[pessoas[i].id] === 'undefined') {
            // cria conexão
            const socket = ioc.connect('http://' + pessoas[i].ip + ':' + 3000, {
                timeout: 5000,
            });

            // salva conexão
            conectados[pessoas[i].id] = socket;
            try {
                cliente.comandos(socket, pessoas[i]);
            } catch (ex) {
                console.error(ex);
            }
        }
    }
}


module.exports.cliente = (ioc) => {
    /* Tenta conectar nos outros usuários a cada 5 segundos */
    setInterval(() => {
        listaServidores(ioc, conectados);
    }, 10000);

    /* executa quando carregar a primeira vez*/
    listaServidores(ioc, conectados);
};

module.exports.envia = (id, evento, objeto) => {
    if (conectados[id]) {
        conectados[id].emit(evento, JSON.stringify(objeto));
        return true;
    }

    return false;
}

module.exports.servidor = (io) => {
    io.on('connection', async (socket) => {
        /* Pega endereço ip da pessoa*/
        let address = socket.handshake.address;
        if (typeof address === 'undefined') {
            console.info('ip não encontrado');
            return;
        }
        
        address = address.replace('::ffff:', '').trim();

        /* caso a pessoa não seja amiga não deixa fazer nada*/
        const pessoa = await knex.first('id', 'nome').from('pessoa').where('ip', address);
        if (!pessoa) {
            return;
        }

        /* configura comandos para a pessoa*/
        try {
            servidor.comandos(socket, pessoa);
        } catch (ex) {
            console.error(ex);
        }
    });
};



