CREATE DATABASE MedicalHosp;

use MedicalHosp;

CREATE TABLE Usuarios (
	id INT IDENTITY(1,1) PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	senha VARCHAR(100) NOT NULL,
	perfil VARCHAR(20) NOT NULL
);

CREATE TABLE Padroes (
	id INT IDENTITY(1,1) PRIMARY KEY,
	equipamento VARCHAR(100) NOT NULL,
	id_usuario INT NOT NULL,
	tag VARCHAR(50) NOT NULL,
	patrimonio VARCHAR(100),
	fabricante VARCHAR(100),
	setor VARCHAR(50),
	modelo VARCHAR(100),
	numero_serie VARCHAR(50),

	CONSTRAINT FK_Padrao_Usuario
		FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);


CREATE TABLE Fornecedores (
	id INT IDENTITY(1,1) PRIMARY KEY,
	id_usuario INT NOT NULL,
	nome VARCHAR(100) NOT NULL,
	razao_social VARCHAR(100),
	cnpj VARCHAR(20),
	responsavel VARCHAR(100),
	telefone VARCHAR(20),
	email VARCHAR(100),
	usuario_portal VARCHAR(100),
	senha_portal VARCHAR(100),
	link_portal VARCHAR(255),

	CONSTRAINT FK_Fornecedor_Usuario
		FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);

CREATE TABLE Calibracoes (
	id INT IDENTITY(1,1) PRIMARY KEY,
	id_padrao INT NOT NULL,
	id_usuario INT NOT NULL,
	id_fornecedor INT NOT NULL,
	data_realizacao DATE NOT NULL,
	periodicidade VARCHAR(100) NOT NULL,
	numero_certificado VARCHAR(100),
	custo DECIMAL(10, 2),
	certificado_pdf VARCHAR(255),

	CONSTRAINT FK_Calibracao_Padrao
        FOREIGN KEY (id_padrao) REFERENCES Padroes(id),
	CONSTRAINT FK_Calibracao_Usuario
		FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
	CONSTRAINT FK_Calibracao_Fornecedor
        FOREIGN KEY (id_fornecedor) REFERENCES Fornecedores(id)
);