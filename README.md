# TechStore — Loja Virtual de Tecnologia

Projeto acadêmico desenvolvido para a disciplina de Web Development (RA3). O objetivo é aplicar conhecimentos de HTML, CSS e JavaScript por meio da criação de uma loja virtual de produtos tecnológicos.

**Site publicado:** https://nportes-7.github.io/techstoreRA3/

**Repositório:** https://github.com/nportes-7/techstoreRA3

## Sobre o projeto

A TechStore é uma aplicação web que simula uma loja virtual de eletrônicos. O projeto permite visualizar produtos obtidos por uma API externa, pesquisar itens, adicionar produtos aos favoritos e utilizar ferramentas de cálculo relacionadas a uma compra.

A aplicação também possui um formulário de atendimento com consulta automática de endereço pelo CEP e envio dos dados por uma requisição HTTP POST.

## Tecnologias utilizadas

- **HTML5:** estruturação das páginas e formulários.
- **CSS3:** estilização, organização dos elementos e responsividade.
- **JavaScript:** funcionalidades, cálculos, manipulação de arrays, eventos e integração com APIs.
- **LocalStorage:** armazenamento dos favoritos e da preferência de tema.
- **Git e GitHub:** versionamento e compartilhamento do código.

## APIs utilizadas

### DummyJSON — Products API

Utilizada para obter os produtos exibidos no catálogo. A aplicação realiza uma busca pelo termo `phone`.

- Método: GET
- Endpoint utilizado: https://dummyjson.com/products/search?q=phone
- Documentação: https://dummyjson.com/docs/products

Os dados utilizados nos cartões incluem título, imagem, preço, categoria e avaliação.

**Observação:** a busca pelo termo `phone` não restringe os resultados exclusivamente a produtos eletrônicos. Por isso, podem aparecer itens de outras categorias.

### ViaCEP

Utilizada para consultar informações de endereço a partir do CEP informado pelo usuário. A consulta ocorre quando o campo perde o foco (`blur`), preenchendo os campos de rua, bairro e cidade.

- Método: GET
- Endpoint: https://viacep.com.br/ws/{cep}/json/
- Documentação: https://viacep.com.br/

### JSONPlaceholder

Utilizada para simular o envio dos dados do formulário de atendimento por meio de uma requisição HTTP POST.

- Método: POST
- Endpoint: https://jsonplaceholder.typicode.com/posts
- Documentação: https://jsonplaceholder.typicode.com/guide/

A API é destinada a testes e demonstrações. O envio não representa um cadastro real de clientes.

## Funcionalidades

- Página inicial com apresentação da loja e da equipe.
- Catálogo de produtos obtidos pela DummyJSON.
- Busca de produtos por título ou categoria.
- Sistema de favoritos com armazenamento no LocalStorage.
- Alternância entre tema claro e escuro, com preferência salva no navegador.
- Calculadora de preço e frete.
- Cálculo de desconto.
- Multiplicação do preço pela quantidade.
- Cálculo do valor das parcelas.
- Cálculo da média de preços dos produtos favoritos.
- Consulta automática de endereço pelo CEP.
- Formulário de atendimento com envio via POST.

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

## TDE 01 — Funções em JavaScript

A página Ferramentas reúne operações matemáticas e o cálculo da média dos preços dos produtos favoritados. Nesta etapa são utilizados funções, arrays, arrow functions, funções anônimas e callbacks.

### Documentação das funções

| Função | Parâmetros | Retorno | Utilização |
|---|---|---|---|
| `somarValores` | `a`, `b` | Soma dos valores | Preço + frete |
| `subtrairDesconto` | `a`, `b` | Diferença entre os valores | Cálculo do desconto |
| `multiplicarQtd` | `a`, `b` | Multiplicação dos valores | Preço × quantidade |
| `dividirParcelas` | `a`, `b` | Resultado da divisão ou mensagem de erro | Cálculo das parcelas |
| `calcularMediaFavoritos` | Nenhum | Média dos preços ou mensagem quando não há favoritos carregados | Média dos favoritos |
| `executarOperacao` | `a`, `b`, `operacaoCallback` | Resultado da função recebida | Execução das operações por callback |

### Recursos utilizados

- Quatro operações matemáticas: soma, subtração, multiplicação e divisão.
- Verificação para impedir divisão por zero.
- Manipulação de arrays com `filter`, `includes`, `push` e `reduce`.
- Utilização de arrow functions.
- Utilização de funções anônimas nos eventos.
- Utilização de callback por meio da função `executarOperacao`.

## TDE 02 — Debugging em JavaScript

Durante o desenvolvimento da TechStore, foram encontrados problemas relacionados ao carregamento dos dados e à consulta de produtos pela API. Abaixo estão registrados os problemas identificados até o momento.

### Erro 1 — Média dos produtos favoritos

**Problema encontrado:**

A página Ferramentas apresentava a mensagem "Nenhum favorito encontrado", mesmo quando existiam produtos favoritados na aplicação.

**Causa identificada:**

O array `produtosMemoria`, utilizado para localizar os produtos e calcular a média, estava vazio quando a página Ferramentas era aberta diretamente. O carregamento dos produtos acontecia inicialmente apenas na página Explorar.

**Solução aplicada:**

Foi ajustada a inicialização do JavaScript para carregar os produtos também na página Ferramentas.

**Trecho da solução:**

```javascript
if (
    document.getElementById("painelResultado")
) {
    carregarProdutos();
}
```

**Investigação:** análise do fluxo de inicialização e do conteúdo do array `produtosMemoria`.

### Erro 2 — Produtos fora do tema da loja

**Problema encontrado:**

A API retornava produtos de categorias diferentes, incluindo cosméticos e produtos de beleza, que não correspondiam à proposta da TechStore.

**Causa identificada:**

A consulta utilizada não restringe os resultados exclusivamente a produtos eletrônicos.

**Código utilizado:**

```javascript
const API_URL = "https://dummyjson.com/products/search?q=phone";
```

**Situação atual:**

O endpoint continua realizando a busca pelo termo `phone`.

**Investigação:** verificar a requisição e os produtos retornados pela API na aba Network do navegador.

### Erro 3 — Registro pendente

O terceiro erro real e sua investigação ainda precisam ser identificados e documentados pela equipe. Não foi incluído um problema hipotético nesta versão.

### Evidências de debugging

Adicionar as evidências coletadas durante a investigação:

- Captura de tela de um breakpoint com o código pausado e o Scope ou Watch visível.
- Captura de tela da aba Network mostrando uma requisição HTTP investigada.
- Trechos de código antes e depois das correções realizadas.

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

Desenvolvido como atividade acadêmica da disciplina Raciocínio Algorítmico 3 (RA3) — 2026.
