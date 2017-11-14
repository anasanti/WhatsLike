const knex = require('./database');
const cliente = require('./p2p/cliente');
const servidor = require('./p2p/servidor');

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
            cliente.comandos(socket, pessoas[i]);
        }
    }
}


module.exports.cliente = (ioc) => {
    /* Tenta conectar nos outros usuários a cada 5 segundos */
    setInterval(() => {
        listaServidores(ioc, conectados);
    }, 10000);

    // executa quando carregar a primeira vez
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
        // Pega endereço ip da pessoa
        const address = socket.handshake.address;
        if (typeof address === 'undefined') {
            console.log('ip não encontrado');
            return;
        }

        // caso a pessoa não seja amiga não deixa fazer nada
        const pessoa = await knex.first('id', 'nome').from('pessoa').where('ip', address);
        if (pessoa === null) {
            return;
        }

        // configura comandos para a pessoa
        servidor.comandos(socket, pessoa);
    });
};



