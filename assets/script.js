async function findAllProdutos() {
  const res = await fetch("http://localhost:3001/produtos/listar-produtos");

  const produtos = await res.json();

  produtos.forEach((element) => {
    document.getElementById("produtoList").insertAdjacentHTML(
      "beforeend",
      `<div class="ProdutoListaItem">
        <div>
          <img class="ProdutoListaItem__foto" src="${element.foto}" alt="Foto do ${element.modelo} ">
        </div>
        <div class="ProdutoListaItem__tipo">${element.tipo}</div>
        <div class="ProdutoListaItem__marca">${element.marca}</div>
        <div class="ProdutoListaItem__modelo">${element.modelo}</div>
        <div class='ProdutoListaItem__preco'>R$ ${element.preco.toFixed(2)}</div>
      </div>`
    );
  });
}

findAllProdutos();

