
// ======================
// CONFIGURAÇÕES GERAIS
// ======================

const API_URL = "https://dummyjson.com/products/search?q=phone";

let produtosMemoria = [];

let favoritos =
    JSON.parse(
        localStorage.getItem("favoritosTechStore")
    ) || [];


// ======================
// TEMA ESCURO
// ======================

function carregarTema() {

    const temaSalvo =
        localStorage.getItem("temaEscuroTechStore");

    if (temaSalvo === "true") {
        document.body.classList.add("escuro");
    }
}

function alternarTema() {

    document.body.classList.toggle("escuro");

    const temaAtual =
        document.body.classList.contains("escuro");

    localStorage.setItem(
        "temaEscuroTechStore",
        temaAtual
    );
}


// ======================
// API DUMMYJSON
// ======================

async function carregarProdutos() {

    const mensagem =
        document.getElementById("mensagemCarregamento");

    try {

        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Status " + resposta.status);
        }

        const dados = await resposta.json();

        produtosMemoria = dados.products;

        if (mensagem) {
            mensagem.textContent = "";
        }

        renderizarCartoes(produtosMemoria);

    } catch (erro) {

        if (mensagem) {
            mensagem.textContent = "Erro ao carregar produtos.";
        }

        console.error("Erro ao carregar produtos:", erro);
    }
}


// ======================
// CARTÕES
// ======================

function renderizarCartoes(lista) {

    const conteiner =
        document.getElementById("gradeProdutos");

    if (!conteiner) {
        return;
    }

    conteiner.innerHTML = "";

    lista.forEach((produto) => {

        const card = document.createElement("div");
        card.classList.add("card");

        const titulo = document.createElement("h3");
        titulo.textContent = produto.title;

        const imagem = document.createElement("img");
        imagem.src = produto.thumbnail;
        imagem.alt = "Imagem do produto " + produto.title;

        const preco = document.createElement("p");
        preco.textContent = "Preço: US$ " + produto.price;

        const categoria = document.createElement("p");
        categoria.textContent = "Categoria: " + produto.category;

        const avaliacao = document.createElement("p");
        avaliacao.textContent = "Avaliação: " + produto.rating;

        const botao = document.createElement("button");

        botao.textContent =
            favoritos.includes(produto.id)
                ? "Remover Favorito"
                : "Favoritar";

        botao.addEventListener("click", function () {

            alternarFavorito(produto.id);

        });

        card.appendChild(titulo);
        card.appendChild(imagem);
        card.appendChild(preco);
        card.appendChild(categoria);
        card.appendChild(avaliacao);
        card.appendChild(botao);

        conteiner.appendChild(card);

    });
}


// ======================
// FAVORITOS
// ======================

function alternarFavorito(idProduto) {

    const existe =
        favoritos.includes(idProduto);

    if (existe) {

        favoritos =
            favoritos.filter(
                item => item !== idProduto
            );

    } else {

        favoritos.push(idProduto);
    }

    localStorage.setItem(
        "favoritosTechStore",
        JSON.stringify(favoritos)
    );

    renderizarCartoes(produtosMemoria);
}


// ======================
// BUSCA
// ======================

function configurarBusca() {

    const campoBusca =
        document.getElementById("campoBusca");

    if (!campoBusca) {
        return;
    }

    campoBusca.addEventListener("input", (evento) => {

        const termo =
            evento.target.value.toLowerCase();

        const filtrados =
            produtosMemoria.filter((produto) =>

                produto.title.toLowerCase().includes(termo)

                ||

                produto.category.toLowerCase().includes(termo)

            );

        renderizarCartoes(filtrados);

    });
}


// ======================
// TDE 01
// ======================

function somarValores(a, b) {
    return a + b;
}

function subtrairDesconto(a, b) {
    return a - b;
}

function multiplicarQtd(a, b) {
    return a * b;
}

function dividirParcelas(a, b) {

    if (b === 0) {
        return "Não é possível dividir por zero.";
    }

    return a / b;
}

function executarOperacao(a, b, operacaoCallback) {

    return operacaoCallback(a, b);
}


function calcularMediaFavoritos() {

    const produtosFavoritos =
        produtosMemoria.filter(
            produto =>
                favoritos.includes(produto.id)
        );

    if (produtosFavoritos.length === 0) {

        return "Nenhum favorito encontrado.";
    }

    const somaPrecos =
        produtosFavoritos.reduce(
            (acumulador, produto) =>
                acumulador + produto.price,
            0
        );

    return (
        somaPrecos / produtosFavoritos.length
    ).toFixed(2);
}


function configurarFerramentas() {

    const painel =
        document.getElementById("painelResultado");

    if (!painel) {
        return;
    }

    function obterValores() {

        return {

            preco: Number(
                document.getElementById("precoItem").value
            ),

            quantidade: Number(
                document.getElementById("qtdItem").value
            ),

            frete: Number(
                document.getElementById("valorFrete").value
            ),

            desconto: Number(
                document.getElementById("descontoCupom").value
            ),

            parcelas: Number(
                document.getElementById("qtdParcelas").value
            )

        };
    }


    document.getElementById("btnSomar")
    ?.addEventListener("click", function () {

        const dados = obterValores();

        const resultado =
            executarOperacao(
                dados.preco,
                dados.frete,
                somarValores
            );

        painel.textContent =
            "Preço + Frete = R$ " + resultado;

    });


    document.getElementById("btnDesconto")
    ?.addEventListener("click", function () {

        const dados = obterValores();

        const resultado =
            executarOperacao(
                dados.preco,
                dados.desconto,
                subtrairDesconto
            );

        painel.textContent =
            "Preço com desconto = R$ " + resultado;

    });


    document.getElementById("btnMultiplicar")
    ?.addEventListener("click", function () {

        const dados = obterValores();

        const resultado =
            executarOperacao(
                dados.preco,
                dados.quantidade,
                multiplicarQtd
            );

        painel.textContent =
            "Valor total = R$ " + resultado;

    });


    document.getElementById("btnParcelar")
    ?.addEventListener("click", function () {

        const dados = obterValores();

        const total =
            multiplicarQtd(
                dados.preco,
                dados.quantidade
            );

        const resultado =
            executarOperacao(
                total,
                dados.parcelas,
                dividirParcelas
            );

        painel.textContent =
            "Valor da parcela = R$ " + resultado;

    });


    document.getElementById("btnMediaFavoritos")
    ?.addEventListener("click", function () {

        painel.textContent =
            "Preço médio dos favoritos: R$ " +
            calcularMediaFavoritos();

    });

}


// ======================
// VIACEP
// ======================

function configurarViaCEP() {

    const campoCep =
        document.getElementById("campoCep");

    if (!campoCep) {
        return;
    }

    campoCep.addEventListener("blur", async () => {

        const cep =
            campoCep.value.replace(/\D/g, "");

        if (cep.length !== 8) {
            return;
        }

        try {

            const resposta = await fetch(
                `https://viacep.com.br/ws/${cep}/json/`
            );

            const dados = await resposta.json();

            if (dados.erro) {

                alert("CEP não encontrado.");

                return;
            }

            document.getElementById("rua").value =
                dados.logradouro;

            document.getElementById("bairro").value =
                dados.bairro;

            document.getElementById("cidade").value =
                dados.localidade;

        } catch {

            alert("Erro ao consultar CEP.");

        }

    });

}


// ======================
// POST
// ======================

function configurarFormulario() {

    const formulario =
        document.getElementById("formContato");

    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", async function (event) {

        event.preventDefault();

        const dadosForm = {

            nome:
                document.getElementById("nomeCliente").value,

            email:
                document.getElementById("emailCliente").value,

            telefone:
                document.getElementById("telefoneCliente").value,

            mensagem:
                document.getElementById("mensagemCliente").value

        };

        try {

            const resposta = await fetch(
                "https://jsonplaceholder.typicode.com/posts",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(dadosForm)
                }
            );

            document.getElementById("resultadoFormulario").textContent =
                "Enviado com sucesso! Status: " +
                resposta.status;

            formulario.reset();

        } catch {

            document.getElementById("resultadoFormulario").textContent =
                "Erro ao enviar formulário.";

        }

    });

}


// ======================
// INICIALIZAÇÃO
// ======================

document.addEventListener("DOMContentLoaded", function () {

    carregarTema();

    const btnTema =
        document.getElementById("btnTema");

    if (btnTema) {

        btnTema.addEventListener(
            "click",
            alternarTema
        );

    }

    if (
        document.getElementById("gradeProdutos")
    ) {

        carregarProdutos();
        configurarBusca();

    }

    // CORREÇÃO:
    // Também carrega os produtos na página Ferramentas.

    if (
        document.getElementById("painelResultado")
    ) {

        carregarProdutos();

    }

    configurarFerramentas();
    configurarViaCEP();
    configurarFormulario();

});
