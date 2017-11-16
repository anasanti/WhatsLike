-- Criação do Banco de dados

-- Alunos: Ana Carolina Prates Santi e Igor Fraga de Andrade

-- 16/11/2017

CREATE DATABASE IF NOT EXISTS `whatslike`
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;

USE `whatslike`;

CREATE TABLE IF NOT EXISTS `whatslike`.`pessoa` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(8) NOT NULL,
  `ip` VARCHAR (15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `whatslike`.`grupo` (
    `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(8) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `whatslike`.`grupo_pessoa` (
    `id_pessoa` BIGINT(20) UNSIGNED NOT NULL,
    `id_grupo` BIGINT(20) UNSIGNED NOT NULL,
    PRIMARY KEY(`id_pessoa`,`id_grupo`),
    FOREIGN KEY (`id_pessoa`) REFERENCES pessoa(id),
    FOREIGN KEY (`id_grupo`) REFERENCES grupo(id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `whatslike`.`mensagem` (
    `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_origem` BIGINT(20) UNSIGNED NOT NULL,
    `id_destino` BIGINT(20) UNSIGNED NOT NULL,
    `id_grupo` BIGINT(20) UNSIGNED NULL,
    `data_hora_envio` DATETIME NOT NULL,
    `data_hora_recebimento` DATETIME NULL,
    `data_hora_leitura` DATETIME NULL,
    `mensagem` VARCHAR(32) NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY (`id_origem`) REFERENCES pessoa(id),
    FOREIGN KEY (`id_destino`) REFERENCES pessoa(id),
    FOREIGN KEY (`id_grupo`) REFERENCES grupo(id)
) ENGINE = InnoDB;

INSERT INTO pessoa (id, nome, ip)
    VALUES (1, 'eu', '127.0.0.1');
