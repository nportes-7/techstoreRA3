TechStore — Loja Virtual de Tecnologia

Projeto acadêmico desenvolvido para a disciplina de Web Development (RA3). O objetivo é aplicar conhecimentos de HTML, CSS e JavaScript por meio da criação de uma loja virtual de produtos tecnológicos.

Site publicado: https://nportes-7.github.io/techstoreRA3/

Repositório: https://github.com/nportes-7/techstoreRA3

Sobre o projeto

A TechStore é uma aplicação web que simula uma loja virtual de eletrônicos. O projeto permite visualizar produtos obtidos por uma API externa, pesquisar itens, adicionar produtos aos favoritos e utilizar ferramentas de cálculo relacionadas a uma compra.

A aplicação também possui um formulário de atendimento com consulta automática de endereço pelo CEP e envio dos dados por uma requisição HTTP POST.

Tecnologias utilizadas
HTML5: estruturação das páginas e formulários.
CSS3: estilização, organização dos elementos e responsividade.
JavaScript: funcionalidades, cálculos, manipulação de arrays, eventos e integração com APIs.
LocalStorage: armazenamento dos favoritos e da preferência de tema.
Git e GitHub: versionamento e compartilhamento do código.
APIs utilizadas
DummyJSON — Products API

Utilizada para obter os produtos exibidos no catálogo. A aplicação realiza uma busca pelo termo phone.

Método: GET
Endpoint utilizado: https://dummyjson.com/products/search?q=phone
Documentação: https://dummyjson.com/docs/products

Os dados utilizados nos cartões incluem título, imagem, preço, categoria e avaliação.

Observação: a busca pelo termo phone retorna 23 produtos, das categorias smartphones e mobile-accessories.

ViaCEP

Utilizada para consultar informações de endereço a partir do CEP informado pelo usuário. A consulta ocorre quando o campo perde o foco (blur), preenchendo os campos de rua, bairro e cidade.

Método: GET
Endpoint: https://viacep.com.br/ws/{cep}/json/
Documentação: https://viacep.com.br/
JSONPlaceholder

Utilizada para simular o envio dos dados do formulário de atendimento por meio de uma requisição HTTP POST.

Método: POST
Endpoint: https://jsonplaceholder.typicode.com/posts
Documentação: https://jsonplaceholder.typicode.com/guide/

A API é destinada a testes e demonstrações. O envio não representa um cadastro real de clientes.

Funcionalidades
Página inicial com apresentação da loja e da equipe.
Catálogo de produtos obtidos pela DummyJSON.
Busca de produtos por título ou categoria.
Sistema de favoritos com armazenamento no LocalStorage.
Alternância entre tema claro e escuro, com preferência salva no navegador.
Calculadora de preço e frete.
Cálculo de desconto.
Multiplicação do preço pela quantidade.
Cálculo do valor das parcelas.
Cálculo da média de preços dos produtos favoritos.
Consulta automática de endereço pelo CEP.
Formulário de atendimento com envio via POST.
Estrutura do projeto
text
TechStore/
│
├── index.html
├── explorar.html
├── ferramentas.html
├── contato.html
├── style.css
├── app.js
├── breakpoint-media-favoritos.png
├── network-dummyjson.png
└── README.md
TDE 01 — Funções em JavaScript

A página Ferramentas reúne operações matemáticas e o cálculo da média dos preços dos produtos favoritados. Nesta etapa são utilizados funções, arrays, arrow functions, funções anônimas e callbacks.

Documentação das funções
Função	Parâmetros	Retorno	Utilização
somarValores	a, b	Soma dos valores	Preço + frete
subtrairDesconto	a, b	Diferença entre os valores	Cálculo do desconto
multiplicarQtd	a, b	Multiplicação dos valores	Preço × quantidade
dividirParcelas	a, b	Resultado da divisão ou mensagem de erro	Cálculo das parcelas
calcularMediaFavoritos	Nenhum	Média dos preços ou mensagem quando não há favoritos carregados	Média dos favoritos
executarOperacao	a, b, operacaoCallback	Resultado da função recebida	Execução das operações por callback
Recursos utilizados
Quatro operações matemáticas: soma, subtração, multiplicação e divisão.
Verificação para impedir divisão por zero.
Manipulação de arrays com filter, includes, push e reduce.
Utilização de arrow functions.
Utilização de funções anônimas nos eventos.
Utilização de callback por meio da função executarOperacao.
TDE 02 — Debugging em JavaScript

Durante o desenvolvimento da TechStore, foram encontrados problemas relacionados ao carregamento dos dados, à consulta de produtos pela API e ao formulário de atendimento. Abaixo estão registrados os erros, como foram identificados e as soluções aplicadas.

Erro 1 — Média dos produtos favoritos (erro de lógica)

Problema encontrado:

A página Ferramentas apresentava a mensagem "Nenhum favorito encontrado", mesmo quando existiam produtos favoritados na aplicação.

Causa identificada:

O array produtosMemoria, utilizado para localizar os produtos e calcular a média, estava vazio quando a página Ferramentas era aberta diretamente. O carregamento dos produtos acontecia inicialmente apenas na página Explorar.

Solução aplicada:

Foi ajustada a inicialização do JavaScript para carregar os produtos também na página Ferramentas.

Trecho da solução:

javascript
if (
    document.getElementById("painelResultado")
) {
    carregarProdutos();
}

Investigação: análise do fluxo de inicialização e do conteúdo do array produtosMemoria.

Erro 2 — Produtos fora do tema da loja

Problema encontrado:

O catálogo exibia produtos que não correspondiam à proposta da TechStore, como cosméticos e produtos de beleza.

Causa identificada:

O endpoint utilizado devolvia produtos de todas as categorias da DummyJSON, sem filtrar pelo tema da loja.

Solução aplicada:

O endpoint passou a usar a busca pelo termo phone, que retorna apenas produtos das categorias smartphones e mobile-accessories.

Antes:

javascript
const API_URL = "https://dummyjson.com/products";

Depois:

javascript
const API_URL = "https://dummyjson.com/products/search?q=phone";

Investigação: aba Network do navegador, conferindo a requisição GET e a categoria dos produtos retornados pela API (ver evidência 2).

Erro 3 — CEP com hífen não preenche o endereço

Problema encontrado:

Na página Contato, ao digitar o CEP com hífen (por exemplo, 01001-000), os campos de rua, bairro e cidade não são preenchidos e nenhuma mensagem é exibida.

Causa identificada:

O campo CEP possui maxlength="8". Com o hífen, o último dígito é cortado e restam apenas 7 números. Assim, a validação cep.length !== 8 encerra a função antes da consulta ao ViaCEP.

Solução aplicada:

O atributo maxlength do campo CEP, no arquivo contato.html, foi alterado de 8 para 9, permitindo digitar o CEP com hífen.

Antes:

html
maxlength="8"

Depois:

html
maxlength="9"

Investigação: teste do campo CEP com e sem hífen e análise da função configurarViaCEP.

Erro 4 — Campo Mensagem aceitava envio vazio

Problema encontrado:

Na página Contato, o campo Mensagem não exibia o texto de exemplo "Digite sua mensagem" e o formulário podia ser enviado sem nenhuma mensagem digitada.

Causa identificada:

Havia espaços e uma quebra de linha entre a abertura e o fechamento da tag <textarea>. Esses espaços viravam o conteúdo do campo, então o placeholder não aparecia e o required considerava o campo preenchido.

Solução aplicada:

O fechamento </textarea> foi colado logo depois da abertura da tag, deixando o campo realmente vazio.

Antes:

html
placeholder="Digite sua mensagem">
</textarea>

Depois:

html
placeholder="Digite sua mensagem"></textarea>

Investigação: teste de envio do formulário com o campo Mensagem vazio e análise do código do contato.html.

Evidências de debugging

Evidências coletadas durante a investigação:

1. Breakpoint com o código pausado e o Scope visível

Breakpoint pausado na função calcularMediaFavoritos com o Scope visível

Execução pausada na linha 238 do app.js, dentro da função calcularMediaFavoritos, na página Ferramentas. No painel Scope (Escopo), o array produtosMemoria aparece com 23 produtos carregados e produtosFavoritos contém os 3 produtos favoritados, o que confirma a correção do Erro 1.

2. Aba Network com a requisição HTTP investigada

Aba Network mostrando a requisição GET para a DummyJSON

Requisição GET para https://dummyjson.com/products/search?q=phone, com status 200 OK, utilizada para verificar os produtos retornados pela API (Erro 2).

3. Código antes e depois da correção (Erro 1)

Antes: os produtos eram carregados apenas na página Explorar.

javascript
if (document.getElementById("gradeProdutos")) {
    carregarProdutos();
    configurarBusca();
}

Depois: os produtos também passaram a ser carregados na página Ferramentas.

javascript
if (document.getElementById("gradeProdutos")) {
    carregarProdutos();
    configurarBusca();
}

// CORREÇÃO: também carrega os produtos na página Ferramentas.
if (document.getElementById("painelResultado")) {
    carregarProdutos();
}
Equipe
Natã Portes Banruque da Silva — desenvolvimento do código (HTML, CSS e JavaScript), integração com as APIs, publicação no GitHub Pages e relatório de debugging (TDE 02).
Gustavo Egídio Barros — parte do desenvolvimento do código (HTML, CSS e JavaScript) HTML semântico: troca dos cartões de div para article. Apresenta as 4 páginas e a estrutura do HTML.
Mateus Augusto Tosin — parte do desenvolvimento do código (HTML, CSS e JavaScript) ajuste do Flexbox do menu (justify-content). Apresenta o layout, a responsividade e o modo escuro.
Mateus Emmanuel Louzano de Quadros — TDE 01: Ajuda no desenvolvimento do js, detalhamento dos recursos utilizados na documentação. Apresenta a página Ferramentas e a callback.
Matheus Henrique Rios Ferreira — Participou do desenvolvimento do código CSS e JS. Formulário: correção do campo CEP (Erro 3) e do campo Mensagem (Erro 4). Apresenta as requisições GET e POST.
Como executar o projeto
Baixe ou clone este repositório.
Abra a pasta do projeto no Visual Studio Code.
Execute o arquivo index.html utilizando a extensão Live Server.
Navegue pelas páginas utilizando o menu principal.

É necessário ter conexão com a internet para utilizar as APIs externas.

Observação

Este projeto possui finalidade acadêmica e utiliza APIs públicas para simular funcionalidades de uma loja virtual. Os produtos, preços e envios apresentados não representam necessariamente operações comerciais reais.

Desenvolvido como atividade acadêmica da disciplina Web Development: Front-End (Turma 2° U) (RA3) — 2026.
