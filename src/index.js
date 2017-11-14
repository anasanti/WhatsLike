require('./database');
const readline = require('readline');

/* Socket - Server */
const server = require('http').Server();
const p2pserver = require('socket.io-p2p-server').Server
const io = require('socket.io')(server);
io.use(p2pserver);

/* Socket - Client */
const ioc = require('socket.io-client');

/* p2p */
const p2p = require('./p2p');
p2p.cliente(ioc);
p2p.servidor(io);

/* Comandos */
const insereCadastro = require('./insereCadastro');//i
const listaContatos = require('./listaContatos');//c
const listaGrupos = require('./listaGrupos');//g  --
const enviaMenssagem = require('./enviaMenssagem');//s
const listaMensagens = require('./listaMensagens');//l --

function help() {
  console.log('Comandos:');
  console.log('i [nome] [ip]', 'Insere um novo contato');
  console.log('g [nome] [lista_nome]', 'Insere nome na lista de grupos');
  console.log('l [nome]', 'Lista mensagens');
  console.log('s [nome] [msg]', 'Envia mensagem');
  console.log('c [nome] [grupo]', 'Lista todos os contatos e grupos');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

server.listen(3000, () => {
  rl.prompt();

  rl.on('line', (line) => {
    const args = line.split(' ');
      switch (args[0]) {
      case 'i': insereCadastro(args[1], args[2]); break;
      case 'g': listaGrupos(args[1], args[2]); break;
      case 'l': listaMensagens(args[1]); break;
      case 's': enviaMenssagem(args[1], args[2]); break;
      case 'c': listaContatos(); break;
      case 'q': rl.close(); break;
      case 'h': help(); break;
      default: help(); break;
    }
    rl.prompt();
  }).on('close', () => {
    process.exit(0);
  });
});
