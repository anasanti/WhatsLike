/* Realiza a comunicação para os outros programas

Alunos: Ana Carolina Prates Santi e Igor Fraga de Andrade

16/11/2017*/
const knex = require('../database');
const validacao = require('../validacao');
const sql = require('./sql');


const criaTabelas = async () => {
    try {
        await knex.raw(sql.pessoa);
    } catch (ex) {
        console.error('pessoa', ex);
        throw new Error('setup fail');
    }

    try {
        await knex.raw(sql.grupo);
    } catch (ex) {
        console.error('grupo', ex);
        throw new Error('setup fail');
    }

    try {
        await knex.raw(sql.grupo_pessoa);
    } catch (ex) {
        console.error('grupo_pessoa', ex);
        throw new Error('setup fail');
    }

    try {
        await knex.raw(sql.mensagem);
    } catch (ex) {
        console.error('mensagem', ex);
        throw new Error('setup fail');
    }

    try {
        await knex.raw(sql.pessoa);
    } catch (ex) {
        console.error('pessoa', ex);
        throw new Error('setup fail');
    }
};

const pegaNome = async (rl, done) => {
    console.info('Qual seu nome?');
    rl.prompt();

    rl.once('line', (linha) => {
        if (validacao.validanome(linha)) {
            done(linha.toLowerCase());
        } else {
            console.error('Nome inválido, tente novamente')
            pegaNome(rl, done);
        }
    });
};

const pegaIP = async (rl, done) => {
    console.info('Qual seu ip?');
    rl.prompt();

    rl.once('line', (linha) => {
        if (validacao.validaip(linha)) {
            done(linha.toLowerCase());
        } else {
            console.error('IP inválido, tente novamente')
            pegaIP(rl, done);
        }
    });
};

module.exports = async (rl, done) => {
    const exists = await knex.schema.hasTable('pessoa');
    if (!exists) {
        pegaNome(rl, async (nome) => {
            pegaIP(rl, async (ip) => {
                criaTabelas();
                
                await knex('pessoa').insert({
                    id: 1,
                    nome: nome,
                    ip: ip,
                });
    
                done();
            });
        });
    } else {
        done();
    }
};