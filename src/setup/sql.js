
module.exports.pessoa = `
    CREATE TABLE IF NOT EXISTS pessoa (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        ip TEXT NOT NULL
    );
`;

module.exports.grupo = `
    CREATE TABLE IF NOT EXISTS grupo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL
    );
`;

module.exports.grupo_pessoa = `
    CREATE TABLE IF NOT EXISTS grupo_pessoa (
        id_pessoa INTEGER,
        id_grupo INTEGER
    );
`;

module.exports.mensagem = `
    CREATE TABLE IF NOT EXISTS mensagem (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_origem INTEGER NOT NULL,
        id_destino INTEGER NOT NULL,
        id_grupo INTEGER NULL,
        data_hora_envio TEXT NOT NULL,
        data_hora_recebimento TEXT NULL,
        data_hora_leitura TEXT NULL,
        mensagem TEXT NOT NULL
    );
`;
