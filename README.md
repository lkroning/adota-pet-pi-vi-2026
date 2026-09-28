# AdotaPet

Plataforma Web para Adoção Responsável e Gestão de Animais Resgatados.

## Sobre o projeto

O AdotaPet é uma plataforma web desenvolvida para facilitar a divulgação de animais resgatados disponíveis para adoção e auxiliar no gerenciamento das solicitações de adoção.

O sistema possui uma área pública, onde visitantes podem visualizar, pesquisar e filtrar animais, consultar seus detalhes e demonstrar interesse na adoção.

Também possui uma área administrativa, destinada ao gerenciamento dos animais cadastrados e das solicitações de adoção.

## Funcionalidades

### Área pública

- Visualização dos animais cadastrados
- Pesquisa por nome
- Filtros por espécie, sexo e porte
- Visualização dos detalhes de cada animal
- Formulário para demonstrar interesse na adoção
- Registro das solicitações no banco de dados

### Área administrativa

- Login do administrador
- Dashboard administrativo
- Cadastro de animais
- Edição de animais
- Exclusão de animais
- Alteração do status dos animais
- Visualização das solicitações de adoção
- Atualização do status das solicitações

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- SQLite
- better-sqlite3
- bcryptjs

## Estrutura do projeto

```text
AdotaPet/
├── database/
│   ├── adotapet.db
│   └── schema.sql
│
├── public/
│   ├── index.html
│   ├── animal.html
│   ├── interesse.html
│   ├── admin.html
│   ├── dashboard.html
│   ├── animais-admin.html
│   └── solicitacoes-admin.html
│
├── src/
│   ├── controllers/
│   ├── database/
│   ├── models/
│   ├── routes/
│   └── services/
│
├── tests/
├── package.json
├── package-lock.json
└── server.js