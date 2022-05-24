const baseUrl = "http://localhost:3001";

const buscarProdutos = async () => {
  const res = await fetch(`${baseUrl}/produtos/listar-produtos`);
  const produtos = await res.json();

  return produtos;
};

buscarProdutos();

const buscarProdutoId = async (id) => {
  const res = await fetch(`${baseUrl}/produtos/listar-produto/${id}`);

  if (res.status === 404) {
    return false;
  }
  const produto = await res.json();

  return produto;
};

const criarProduto = async (tipo, marca, modelo, descricao, cor, condicao, foto, preco, garantia) => {
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

  console.log(novoProduto);
  return novoProduto;
};

const atualizarProduto = async (id, tipo, marca, modelo, descricao, cor, condicao, foto, preco, garantia) => {
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
};

const excluirProduto = async (id) => {
  const res = await fetch(`${baseUrl}/produtos/deletar-produto/${id}`, {
    method: "DELETE",
    mode: "cors",
  });

  if (res.status === 204) {
    return "Produto excluido com sucesso!";
  } else {
    return "Produto não encontrado!";
  }
};

const imprimirProdutos = async () => {
  const produtos = await buscarProdutos();

  produtos.forEach((element) => {
    document.getElementById("produtoList").insertAdjacentHTML(
      "beforeend",
      `<div class="ProdutoListaItem">
        <img class="ProdutoListaItem__foto" src="${element.foto}" alt="Foto do ${element.modelo} " />
        <div>
          <div class="ProdutoListaItem__tipo">${element.tipo}</div>
          <div class="ProdutoListaItem__marca">${element.marca}</div>
          <div class="ProdutoListaItem__modelo">${element.modelo}</div>
          <div class="ProdutoListaItem__preco">R$ ${element.preco.toFixed(2)}</div>
         </div>
      </div>`
    );
  });
};

imprimirProdutos();

const encontrarProdutoId = async () => {
  document.getElementById("produtoEscolhido").innerText = "";

  const id = document.getElementById("inputIdProduto").value;

  const produto = await buscarProdutoId(id);

  if (!produto) {
    const mensagemErro = document.createElement("p");
    mensagemErro.id = "mensagemErro";
    mensagemErro.classList.add("MensagemErro");
    mensagemErro.innerText = "Nenhum produto encontrado!";

    document.getElementById("produtoEscolhido").appendChild(mensagemErro);
  } else {
    document.getElementById("produtoEscolhido").innerHTML = `
  <div class="ProdutoListaItem">
    <img class="ProdutoListaItem__foto" src="${produto.foto}" alt="Foto do ${produto.modelo} " />
    <div>
    <div class="ProdutoListaItem__preco">R$ ${produto.preco.toFixed(2)}</div>
      <div class="ProdutoListaItem__tipo">${produto.tipo}</div>
      <div class="ProdutoListaItem__marca">${produto.marca}</div>
      <div class="ProdutoListaItem__modelo">${produto.modelo}</div>
      <div class="ProdutoListaItem__cor">${produto.cor}</div>
      <div class="ProdutoListaItem__condicao">${produto.condicao}</div>
      <div class="ProdutoListaItem__garantia">${produto.garantia}</div>
      <div class="ProdutoListaItem__descricao">${produto.descricao}</div>
    </div>
  </div>`;
  }
};
