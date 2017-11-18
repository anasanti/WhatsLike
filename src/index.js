/* Indice do programa, inicio do programa 

Alunos: Ana Carolina Prates Santi e Igor Fraga de Andrade

16/11/2017*/
/*Conectando a base de dados */
const knex = require('./database');
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

/* setup */
const setup = require('./setup');

/* Comandos */
const insereCadastro = require('./comandos/insereCadastro');//i
const listaContatos = require('./comandos/listaContatos');//c
const listaGrupos = require('./comandos/listaGrupos');//g  --
const enviaMenssagem = require('./comandos/enviaMenssagem');//s
const listaMensagens = require('./comandos/listaMensagens');//l --
const help = require('./comandos/help'); // h

/*Criação de interface para o Menu*/
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Verifica a base e cria uma nova caso não exista
setup(rl, () => {

  // Cria serviços
  p2p.cliente(ioc);
  p2p.servidor(io);
  server.listen(3000, async () => {
    // Carrega nome
    global.pessoa = await knex.first('nome').from('pessoa').where('id', 1);

    // inicia interação com o console
    rl.prompt();
    
    rl.on('line', (line) => {
      const args = line.split(' ');
      switch (args[0]) {
        case 'i': insereCadastro(args[1], args[2]); break;
        case 'g': listaGrupos(args[1], args[2]); break;
        case 'l': listaMensagens(args[1]); break;
        case 's': enviaMenssagem(args[1], args); break;
        case 'c': listaContatos(); break;
        case 'q': rl.close(); break;
        case 'h': help(); break;
        default: console.error('Comando inválido');
      }
      rl.prompt();
    }).on('close', () => {
      process.exit(0);
    });
  });
});
