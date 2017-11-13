const knex = require('./database');


module.exports.validanome = function validanome(nome) {
    if (typeof nome !== 'string') {
        console.error('Parâmetro nome requerido');
        return false;
    }
    
    if (nome.lenght > 8 && nome.lenght < 1) {
        console.error('Parâmetro nome incorreto');
        return false;
    }
return true;
}

 module.exports.validaip = function validaip(ip) {
    if (typeof ip !== 'string') {
           console.error('Parâmetro IP requerido');
           return false;
       }

    if (ip.lenght > 15 && ip.lenght < 1){
        console.error('Parâmetro ip incorreto');
        return false;
    }
    return true;
}

module.exports.validamensagem = function validamensagem(msg) {
    if (typeof msg !== 'string') {
           console.error('Parâmetro msg requerido');
           return false;
       }

    if (msg.lenght > 32 && msg.lenght < 1){
        console.error('Parâmetro msg incorreto');
        return false;
    }
    return true;
}

