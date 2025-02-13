const criarListaDeContatos = document.getElementById("criar-lista-de-contatos");

let linhas = "";
let nomesDasListas = [];
let sublistasMemoria = {};
let eventoRegistrado = false; // Variável para controlar a adição de evento no formulário


criarListaDeContatos.addEventListener('submit', function(e) {
    e.preventDefault();
    renderizarConteudolista();
});

function renderizarConteudolista() {
    const inputNovaLista = document.getElementById("criar-nova-lista");
    const nomeDaLista = inputNovaLista.value.trim();

    if (nomesDasListas.includes(nomeDaLista)) {
        alert("Lista já existente!");
        return;
    }

    nomesDasListas.push(nomeDaLista);
    sublistasMemoria[nomeDaLista] = [];

    let linha = `<li>`;
    linha += `<img src="./imagens/livro-de-enderecos.png" alt="caderno de contato"><a onclick="subLista('${nomeDaLista}')">${nomeDaLista}</a>`;
    linha += `</li>`;

    linhas += linha;

    const lista = document.querySelector("ul");
    lista.innerHTML = linhas;

    inputNovaLista.value = "";
}

function subLista(nomeDaLista) {
    let conteudoTelaPrincipal = document.querySelector(".conteudo-principal");
    let subLista = document.querySelector(".sub-listas");
    const nomeLista = document.getElementById("nomeLista");

    nomeLista.textContent = nomeDaLista;

    conteudoTelaPrincipal.style.display = 'none';
    subLista.style.display = "block";

    renderizarConteudoSubLista(nomeDaLista);
}

function voltar() {
    let conteudoTelaPrincipal = document.querySelector(".conteudo-principal");
    let subLista = document.querySelector(".sub-listas");

    conteudoTelaPrincipal.style.display = "block";
    subLista.style.display = "none";
}

function renderizarConteudoSubLista(nomeDaLista) {
    let listaDeContatos = document.getElementById("lista-de-contatos");
    let tabela = document.getElementById("conteudo");

    tabela.innerHTML = "";

    if (sublistasMemoria[nomeDaLista].length > 0) {
        sublistasMemoria[nomeDaLista].forEach(contato => {
            let linha = '<tr>';
            linha += `<td><span>${contato.nome}</span></td>`;
            linha += `<td><span>${contato.telefone}</span></td>`;
            linha += '</tr>';
            tabela.innerHTML += linha;
        });
    }

    listaDeContatos.replaceWith(listaDeContatos.cloneNode(true));

    listaDeContatos = document.getElementById("lista-de-contatos");

    let telefoneInput = listaDeContatos.querySelector('#telefone');
    if (telefoneInput) {
    telefoneInput.addEventListener('input', function (e) {
        let telefone = e.target.value.replace(/\D/g, '');  // Remove todos os caracteres não numéricos
        telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');  // Adiciona o código de área
        telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2');  // Adiciona o traço
        e.target.value = telefone;  // Atualiza o valor do input
    });

    listaDeContatos.addEventListener('submit', function(e) {
        e.preventDefault();
        AdicionarContato(nomeDaLista);
    });
}


function AdicionarContato(nomeDaLista) {
    const inputNome = document.getElementById("nome");
    const inputTelefone = document.getElementById("telefone");

    const nome = inputNome.value.trim();
    const telefone = inputTelefone.value.trim();

    if (nome && telefone) {
        sublistasMemoria[nomeDaLista].push({ nome, telefone });

        inputNome.value = "";
        inputTelefone.value = "";

        renderizarConteudoSubLista(nomeDaLista);
    }
}
}
