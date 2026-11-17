# TechStore — Loja Virtual de Tecnologia

Projeto acadêmico desenvolvido para a disciplina de Raciocínio Algorítmico 3 (RA3), com o objetivo de aplicar conhecimentos de HTML, CSS e JavaScript por meio da criação de uma loja virtual de produtos tecnológicos.

## Sobre o projeto

A TechStore é uma aplicação web que simula uma loja virtual de eletrônicos. O projeto permite visualizar produtos obtidos por meio de uma API externa, pesquisar itens, adicionar produtos aos favoritos e utilizar ferramentas comerciais.

A aplicação também possui um formulário de atendimento integrado à consulta automática de endereço pelo CEP.

## Tecnologias utilizadas

- **HTML5:** estruturação das páginas e formulários.
- **CSS3:** estilização, organização dos elementos, responsividade e modo escuro.
- **JavaScript:** funcionalidades, cálculos, manipulação de arrays e integração com APIs.
- **Git e GitHub:** versionamento e compartilhamento do código.

## APIs utilizadas

**DummyJSON — Products API**

Utilizada para obter os produtos exibidos no catálogo da TechStore, incluindo informações como nome, preço, descrição e imagem.

Documentação: https://dummyjson.com/docs/products

**ViaCEP**

Utilizada para consultar informações de endereço a partir do CEP informado pelo usuário, preenchendo automaticamente os campos de rua, bairro e cidade.

Documentação: https://viacep.com.br/

**JSONPlaceholder**

Utilizada para simular o envio de dados do formulário de atendimento por meio de uma requisição HTTP POST.

Documentação: https://jsonplaceholder.typicode.com/guide/

## Funcionalidades

- Página inicial com apresentação da loja e da equipe.
- Catálogo de produtos obtidos por API.
- Pesquisa de produtos.
- Sistema de favoritos com armazenamento no localStorage.
- Calculadora comercial para operações com preços, quantidades, frete e descontos.
- Cálculo da média de preços dos produtos favoritos.
- Consulta de endereço utilizando CEP.
- Formulário de atendimento com envio de dados via POST.
- Alternância entre tema claro e escuro.

## Estrutura do projeto

```text
TechStore/
│
├── index.html
├── explorar.html
├── ferramentas.html
├── contato.html
├── style.css
├── app.js
└── README.md
```

## Problemas encontrados e soluções

Durante o desenvolvimento, foram identificados problemas de lógica e integração com APIs.

### 1. Cálculo da média dos produtos favoritos

**Problema encontrado:**

A página Ferramentas apresentava a mensagem "Nenhum favorito encontrado", mesmo quando existiam produtos favoritados na aplicação.

**Causa identificada:**

O array `produtosMemoria`, utilizado para localizar os produtos e calcular a média, estava vazio quando a página Ferramentas era aberta diretamente. O carregamento dos produtos acontecia apenas na página Explorar.

**Solução aplicada:**

Foi ajustada a inicialização do JavaScript para carregar os produtos também na página Ferramentas, permitindo que a função de cálculo tivesse acesso aos dados necessários.

### 2. Exibição de produtos fora do tema da loja

**Problema encontrado:**

A API retornava produtos de diferentes categorias, incluindo cosméticos e produtos de beleza, que não correspondiam à proposta da TechStore.

**Causa identificada:**

A requisição utilizada inicialmente não restringia adequadamente os resultados às categorias de tecnologia.

**Solução aplicada:**

Foi ajustada a consulta à DummyJSON para priorizar categorias relacionadas a produtos tecnológicos, mantendo o catálogo coerente com a proposta da loja.

## Equipe

- Gustavo Egídio Barros
- Natã Portes Banruque da Silva
- Mateus Augusto Tosin
- Mateus Emmanuel Louzano de Quadros
- Matheus Henrique Rios Ferreira

## Como executar o projeto

1. Baixe ou clone este repositório.
2. Abra a pasta do projeto no Visual Studio Code.
3. Execute o arquivo `index.html` utilizando a extensão Live Server.
4. Navegue pelas páginas utilizando o menu principal.

É necessário ter conexão com a internet para utilizar as APIs externas.

## Observação

Este projeto possui finalidade acadêmica e utiliza APIs públicas para simular funcionalidades de uma loja virtual. Os produtos, preços e envios apresentados não representam necessariamente operações comerciais reais.

Desenvolvido como atividade acadêmica da disciplina Front-End RA3 — 2026.