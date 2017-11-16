/* Realiza a validação do codigo

Alunos: Ana Carolina Prates Santi e Igor Fraga de Andrade

16/11/2017*/
const knex = require('./database');
const moment = require('moment');


/*Realiza a validação do nome do usuario */
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

/*Realiza validação do Ip do usuario */
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

/*realiza a validação das mensagens entre a troca do usuario */
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

/*Formato da data */
module.exports.mysqlData = () => {
    return moment().format("YYYY-MM-DD HH:mm:ss");
}
