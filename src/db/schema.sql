CREATE TABLE tipo_material (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    versao INTEGER DEFAULT 1 NOT NULL
);

CREATE TABLE estado_item (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT,
    versao INTEGER DEFAULT 1 NOT NULL
);

CREATE TABLE fornecedor (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18),
    telefone VARCHAR(20),
    email VARCHAR(100),
    versao INTEGER DEFAULT 1 NOT NULL
);

------

CREATE TABLE responsavel (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    cargo VARCHAR(50),
    departamento VARCHAR(50),
    telefone VARCHAR(20),
    versao INTEGER DEFAULT 1 NOT NULL
);

CREATE TABLE conferente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    cargo VARCHAR(50),
    telefone VARCHAR(20),
    versao INTEGER DEFAULT 1 NOT NULL
);

------

CREATE TABLE ambiente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    bloco VARCHAR(50),
    andar VARCHAR(20),
    responsavel_id INT REFERENCES responsavel(id),
    versao INTEGER DEFAULT 1 NOT NULL
);

CREATE TABLE patrimonio (
    id SERIAL PRIMARY KEY,
    numero_patrimonio VARCHAR(50) NOT NULL UNIQUE,
    descricao TEXT NOT NULL,
    valor FLOAT NOT NULL,
    observacoes TEXT,
    tipo_material_id INT NOT NULL REFERENCES tipo_material(id),
    estado_item_id INT NOT NULL REFERENCES estado_item(id),
    ambiente_id INT NOT NULL REFERENCES ambiente(id),
    responsavel_id INT NOT NULL REFERENCES responsavel(id),
    fornecedor_id INT REFERENCES fornecedor(id),
    versao INTEGER DEFAULT 1 NOT NULL
);
