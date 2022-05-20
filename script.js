async function findAllProdutos() {
  const response = await fetch("http://localhost:3001/produtos/listar-produtos");

  const produtos = await response.json();

  produtos.forEach((element) => {
    document.getElementById("produtoList").insertAdjacentHTML("beforeend"),
      `<div class="ProdutoListaItem">
      <div>
          <img class="ProdutoListaItem__foto" src="${element.foto}" alt="Foto do ${element.modelo} ">
      </div>
      <div class="ProdutoListaItem__tipo">${element.tipo}</div>
      <div class="ProdutoListaItem__marca">${element.marca}</div>
      <div class="ProdutoListaItem__modelo">${element.modelo}</div>
  </div>`;
  });
}

findAllProdutos();
