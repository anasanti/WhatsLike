module.exports = async () => {
    console.info('Comandos:');
    console.info('i [nome] [ip]', 'Insere um novo contato');
    console.info('g [nome] [lista_nome]', 'Insere nome na lista de grupos');
    console.info('l [nome]', 'Lista mensagens');
    console.info('s [nome] [msg]', 'Envia mensagem');
    console.info('c', 'Lista todos os contatos e grupos');
    console.info('q', 'Sai do programa');
};
