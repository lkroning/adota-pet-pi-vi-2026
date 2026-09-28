-- ============================================
-- BANCO DE DADOS - ADOTAPET
-- ============================================

PRAGMA foreign_keys = ON;

-- ============================================
-- TABELA DE ADMINISTRADORES
-- ============================================

CREATE TABLE IF NOT EXISTS administradores (
    id_admin INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
);

-- ============================================
-- TABELA DE ANIMAIS
-- ============================================

CREATE TABLE IF NOT EXISTS animais (
    id_animal INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    especie TEXT NOT NULL,
    sexo TEXT NOT NULL,
    idade INTEGER NOT NULL,
    porte TEXT NOT NULL,
    descricao TEXT,
    foto TEXT,
    status TEXT NOT NULL DEFAULT 'Disponível'
);

-- ============================================
-- TABELA DE ADOTANTES
-- ============================================

CREATE TABLE IF NOT EXISTS adotantes (
    id_adotante INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL,
    cidade TEXT NOT NULL
);

-- ============================================
-- TABELA DE SOLICITAÇÕES
-- ============================================

CREATE TABLE IF NOT EXISTS solicitacoes (
    id_solicitacao INTEGER PRIMARY KEY AUTOINCREMENT,
    id_animal INTEGER NOT NULL,
    id_adotante INTEGER NOT NULL,
    data_solicitacao TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    mensagem TEXT,
    status TEXT NOT NULL DEFAULT 'Pendente',

    FOREIGN KEY (id_animal)
        REFERENCES animais(id_animal),

    FOREIGN KEY (id_adotante)
        REFERENCES adotantes(id_adotante)
);

-- ============================================
-- DADOS DE DEMONSTRAÇÃO
-- ============================================

INSERT INTO administradores (nome, email, senha)
VALUES (
    'Administrador',
    'admin@adotapet.com',
    '123456'
);

INSERT INTO animais
(nome, especie, sexo, idade, porte, descricao, foto, status)
VALUES
(
    'Mel',
    'Cachorro',
    'Fêmea',
    2,
    'Médio',
    'Cachorra dócil, brincalhona e carinhosa.',
    'mel.jpg',
    'Disponível'
),
(
    'Thor',
    'Cachorro',
    'Macho',
    4,
    'Grande',
    'Cachorro ativo e amigável.',
    'thor.jpg',
    'Disponível'
),
(
    'Luna',
    'Gato',
    'Fêmea',
    1,
    'Pequeno',
    'Gata tranquila e carinhosa.',
    'luna.jpg',
    'Disponível'
);