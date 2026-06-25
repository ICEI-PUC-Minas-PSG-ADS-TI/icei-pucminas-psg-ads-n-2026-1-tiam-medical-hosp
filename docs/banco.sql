CREATE DATABASE IF NOT EXISTS medical_hosp
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE medical_hosp;

DROP TABLE IF EXISTS calibracoes;
DROP TABLE IF EXISTS padroes;
DROP TABLE IF EXISTS fornecedores;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  uid VARCHAR(128) NOT NULL,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  empresa VARCHAR(150) NULL,
  cargo VARCHAR(100) NULL,
  telefone VARCHAR(30) NULL,
  is_gestor BOOLEAN NOT NULL DEFAULT FALSE,
  photo_url TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (uid),
  UNIQUE KEY uk_users_email (email)
) ENGINE=InnoDB;

CREATE TABLE fornecedores (
  id VARCHAR(128) NOT NULL,
  nome VARCHAR(150) NOT NULL,
  razao_social VARCHAR(180) NOT NULL,
  cnpj VARCHAR(18) NOT NULL,
  responsavel VARCHAR(150) NOT NULL,
  telefone VARCHAR(30) NOT NULL,
  email VARCHAR(255) NOT NULL,
  link_portal TEXT NULL,
  usuario_portal VARCHAR(150) NULL,
  senha_portal VARCHAR(255) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uk_fornecedores_cnpj (cnpj),
  KEY idx_fornecedores_nome (nome)
) ENGINE=InnoDB;

CREATE TABLE padroes (
  id VARCHAR(128) NOT NULL,
  nome VARCHAR(150) NOT NULL,
  fabricante VARCHAR(150) NOT NULL,
  modelo VARCHAR(150) NOT NULL,
  tag VARCHAR(80) NOT NULL,
  num_serie VARCHAR(100) NOT NULL,
  patrimonio VARCHAR(100) NOT NULL,
  setor VARCHAR(120) NOT NULL,
  imagem_url TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uk_padroes_tag (tag),
  UNIQUE KEY uk_padroes_patrimonio (patrimonio),
  KEY idx_padroes_nome (nome),
  KEY idx_padroes_setor (setor)
) ENGINE=InnoDB;

CREATE TABLE calibracoes (
  id VARCHAR(128) NOT NULL,
  padrao_id VARCHAR(128) NOT NULL,
  user_id VARCHAR(128) NOT NULL,
  fornecedor_id VARCHAR(128) NOT NULL,
  data_calibracao DATE NOT NULL,
  numero_certificado VARCHAR(120) NOT NULL,
  periodicidade INT NOT NULL,
  certificado_url TEXT NULL,
  custo DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uk_calibracoes_certificado (numero_certificado),
  KEY idx_calibracoes_padrao (padrao_id),
  KEY idx_calibracoes_user (user_id),
  KEY idx_calibracoes_fornecedor (fornecedor_id),
  KEY idx_calibracoes_data (data_calibracao),

  CONSTRAINT fk_calibracoes_padrao
    FOREIGN KEY (padrao_id)
    REFERENCES padroes (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT fk_calibracoes_user
    FOREIGN KEY (user_id)
    REFERENCES users (uid)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_calibracoes_fornecedor
    FOREIGN KEY (fornecedor_id)
    REFERENCES fornecedores (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT ck_calibracoes_periodicidade
    CHECK (periodicidade > 0),

  CONSTRAINT ck_calibracoes_custo
    CHECK (custo >= 0)
) ENGINE=InnoDB;
