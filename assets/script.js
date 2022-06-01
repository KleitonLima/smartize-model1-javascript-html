const baseUrl = "http://localhost:3001";
let listaProdutos = [];

class Requisicoes {
  async buscarProdutos() {
    const res = await fetch(`${baseUrl}/produtos/listar-produtos`);
    const produtos = await res.json();

    listaProdutos = produtos;

    return produtos;
  }

  async buscarProdutoId(id) {
    const res = await fetch(`${baseUrl}/produtos/listar-produto/${id}`);

    if (res.status === 404) {
      return false;
    }
    const produto = await res.json();

    return produto;
  }

  async criarProduto(tipo, marca, modelo, descricao, cor, condicao, foto, preco, garantia) {
    const produto = {
      tipo,
      marca,
      modelo,
      descricao,
      cor,
      condicao,
      foto,
      preco,
      garantia,
    };
    const res = await fetch(`${baseUrl}/produtos/criar-produto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(produto),
    });

    const novoProduto = await res.json();

    return novoProduto;
  }

  async atualizarProduto(id, tipo, marca, modelo, descricao, cor, condicao, foto, preco, garantia) {
    const produto = {
      tipo,
      marca,
      modelo,
      descricao,
      cor,
      condicao,
      foto,
      preco,
      garantia,
    };
    const res = await fetch(`${baseUrl}/produtos/atualizar-produto/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(produto),
    });

    const produtoAtualizado = await res.json();

    return produtoAtualizado;
  }

  async excluirProduto(id) {
    const res = await fetch(`${baseUrl}/produtos/deletar-produto/${id}`, {
      method: "DELETE",
      mode: "cors",
    });

    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  }
}
const requisicoes = new Requisicoes();

const imprimirProdutos = async () => {
  const produtos = await requisicoes.buscarProdutos();
  document.getElementById("produtoLista").innerHTML = "";

  produtos.forEach((element) => {
    document.getElementById("produtoLista").insertAdjacentHTML(
      "beforeend",
      `<div class="ProdutoListaItem">
        <img class="ProdutoListaItem__foto" src="${element.foto}" alt="Foto do ${element.modelo} " />
        <div>
          <div class="ProdutoListaItem__tipo">${element.tipo}</div>
          <div class="ProdutoListaItem__marca">${element.marca}</div>
          <div class="ProdutoListaItem__modelo">${element.modelo}</div>
          <div class="ProdutoListaItem__preco">R$ ${element.preco.toFixed(2)}</div>
          <div>
            <button class="botao-editar" onclick="mostrarModalEditar('${element._id}')">EDITAR</button>
            <button class="botao-deletar" onclick="mostrarModalDeletar('${element._id}')">DELETAR</button>
          </div>
         </div>
      </div>`
    );
  });
};

imprimirProdutos();

const encontrarProdutoId = async () => {
  document.getElementById("produtoEscolhido").innerText = "";

  const tipo = document.getElementById("inputSearchTipo").value;

  const produtoEscolhido = listaProdutos.filter((elem) => elem.tipo == tipo);

  if (!produtoEscolhido) {
    const mensagemErro = document.createElement("p");
    mensagemErro.id = "mensagemErro";
    mensagemErro.classList.add("MensagemErro");
    mensagemErro.innerText = "Nenhum produto encontrado!";

    document.getElementById("produtoEscolhido").appendChild(mensagemErro);
  }

  produtoEscolhido.forEach((element) => {
    document.getElementById("produtoEscolhido").insertAdjacentHTML(
      "beforeend",
      `<div class="ProdutoListaItem">
         <img class="ProdutoListaItem__foto" src="${element.foto}" alt="Foto do ${element.modelo} " />
        <div>
          <div class="ProdutoListaItem__preco">R$ ${element.preco.toFixed(2)}</div>
          <div class="ProdutoListaItem__tipo">${element.tipo}</div>
          <div class="ProdutoListaItem__marca">${element.marca}</div>
          <div class="ProdutoListaItem__modelo">${element.modelo}</div>
          <div class="ProdutoListaItem__cor">${element.cor}</div>
          <div class="ProdutoListaItem__condicao">${element.condicao}</div>
          <div class="ProdutoListaItem__garantia">${element.garantia}</div>
          <div class="ProdutoListaItem__descricao">${element.descricao}</div>
          <div>
            <button class="botao-editar" onclick="mostrarModalEditar('${element._id}')">EDITAR</button>
            <button class="botao-deletar" onclick="mostrarModalDeletar('${element._id}')">DELETAR</button>
          </div>
        
        </div>
      </div>`
    );
  });
};

const esconderModalCadastro = () => {
  document.getElementById("fundoModalCadastrar").style.display = "none";
  document.getElementById("inputTipo").value = "";
  document.getElementById("inputMarca").value = "";
  document.getElementById("inputModelo").value = "";
  document.getElementById("inputDescricao").value = "";
  document.getElementById("inputCor").value = "";
  document.getElementById("inputCondicao").value = "";
  document.getElementById("inputFoto").value = "";
  document.getElementById("inputPreco").value = "";
  document.getElementById("inputGarantia").value = "";
};

const mostrarModalCadastro = () => {
  document.getElementById("fundoModalCadastrar").style.display = "flex";
};

const cadastrarProduto = async () => {
  const tipo = document.getElementById("inputTipo").value,
    marca = document.getElementById("inputMarca").value,
    modelo = document.getElementById("inputModelo").value,
    descricao = document.getElementById("inputDescricao").value,
    cor = document.getElementById("inputCor").value,
    condicao = document.getElementById("inputCondicao").value,
    foto = document.getElementById("inputFoto").value,
    preco = document.getElementById("inputPreco").value,
    garantia = document.getElementById("inputGarantia").value;

  const produto = await requisicoes.criarProduto(tipo, marca, modelo, descricao, cor, condicao, foto, preco, garantia);
  listaProdutos.push(produto);

  if (produto) {
    mostrarNotificacao("sucess", "Produto Cadastrado");
  } else {
    mostrarNotificacao("error", "Produto não Cadastrado");
  }

  document.getElementById("produtoLista").insertAdjacentHTML(
    "beforeend",
    `<div class="ProdutoListaItem">
    <img class="ProdutoListaItem__foto" src="${produto.foto}" alt="Foto do ${produto.modelo} " />
    <div>
      <div class="ProdutoListaItem__tipo">${produto.tipo}</div>
      <div class="ProdutoListaItem__marca">${produto.marca}</div>
      <div class="ProdutoListaItem__modelo">${produto.modelo}</div>
      <div class="ProdutoListaItem__preco">R$ ${produto.preco.toFixed(2)}</div>
      <div>
        <button class="botao-editar" onclick="mostrarModalEditar('${produto._id}')">EDITAR</button>
        <button class="botao-deletar" onclick="mostrarModalDeletar('${produto._id}')">DELETAR</button>
      </div>

     </div>
  </div>`
  );
  esconderModalCadastro();
};

const esconderModalEditar = () => {
  document.getElementById("fundoModalEditar").style.display = "none";
};

const mostrarModalEditar = (id) => {
  document.getElementById("fundoModalEditar").style.display = "flex";

  const produto = listaProdutos.find((element) => element._id === id);

  document.getElementById("inputTipoEdicao").value = produto.tipo;
  document.getElementById("inputMarcaEdicao").value = produto.marca;
  document.getElementById("inputModeloEdicao").value = produto.modelo;
  document.getElementById("inputDescricaoEdicao").value = produto.descricao;
  document.getElementById("inputCorEdicao").value = produto.cor;
  document.getElementById("inputCondicaoEdicao").value = produto.condicao;
  document.getElementById("inputFotoEdicao").value = produto.foto;
  document.getElementById("inputPrecoEdicao").value = produto.preco;
  document.getElementById("inputGarantiaEdicao").value = produto.garantia;

  const botaoSalvarEdicao = document.getElementById("botaoSalvarEdicao");

  botaoSalvarEdicao.addEventListener("click", async function atualizar() {
    const tipo = document.getElementById("inputTipoEdicao").value,
      marca = document.getElementById("inputMarcaEdicao").value,
      modelo = document.getElementById("inputModeloEdicao").value,
      descricao = document.getElementById("inputDescricaoEdicao").value,
      cor = document.getElementById("inputCorEdicao").value,
      condicao = document.getElementById("inputCondicaoEdicao").value,
      foto = document.getElementById("inputFotoEdicao").value,
      preco = document.getElementById("inputPrecoEdicao").value,
      garantia = document.getElementById("inputGarantiaEdicao").value;

    await requisicoes.atualizarProduto(id, tipo, marca, modelo, descricao, cor, condicao, foto, preco, garantia);

    if (botaoSalvarEdicao) {
      mostrarNotificacao("sucess", "Produto salvo");
    } else {
      mostrarNotificacao("error", "Produto não salvo");
    }

    this.removeEventListener("click", atualizar);

    esconderModalEditar();
    imprimirProdutos();
  });
};

const esconderModalDeletar = () => {
  document.getElementById("fundoModalDeletar").style.display = "none";
};

const mostrarModalDeletar = (id) => {
  document.getElementById("fundoModalDeletar").style.display = "flex";

  const botaoConfirmarExclusao = document.getElementById("botaoConfirmarExclusao");

  botaoConfirmarExclusao.addEventListener("click", async () => {
    const excluir = await requisicoes.excluirProduto(id);

    if (excluir) {
      mostrarNotificacao("sucess", "Produto deletado");
    } else {
      mostrarNotificacao("error", "Produto não encontrado");
    }
    esconderModalDeletar();
    imprimirProdutos();
  });
};

const esconderNotificacao = () => {
  document.getElementById("notification").style.display = "none";
};

const mostrarNotificacao = (tipo, frase) => {
  const notificationSpan = document.getElementById("notificationSpan"),
    notificationP = document.getElementById("notificationP");

  if (tipo === "sucess") {
    notificationSpan.innerHTML = "V";
    notificationSpan.classList = "notificationSpanSucesso";
  } else if (tipo === "error") {
    notificationSpan.innerHTML = "X";
    notificationSpan.classList = "notificationSpanError";
  }

  notificationP.innerText = frase;

  document.getElementById("notification").style.display = "flex";
  setTimeout(() => {
    esconderNotificacao();
  }, 3000);
};
