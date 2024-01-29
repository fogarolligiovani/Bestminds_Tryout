import {useEffect, useState} from "react";
import './App.css';

function App() {
  const [prods, setProds] = useState([]);
  const nome_input = document.getElementById("nome_input")
  const descricao_input = document.getElementById("descricao_input")
  const preco_input = document.getElementById("preco_input")
  const title_form = document.getElementById("title_form")

  useEffect(()=>{
    fetch("http://127.0.0.1:8080/produtos")
    .then((Response) => Response.json())
    .then((data)=>{
      const sortedData = data.sort((a,b) => (a.codigo - b.codigo))
      setProds(sortedData)
    });
  },[]);

  function formAdd_show(){
    nome_input.value = "";
    descricao_input.value = "";
    preco_input.value = "";
    document.getElementById("putBtn").classList.add("hidden");
    document.getElementById("addform").classList.remove("hidden");
    document.getElementById("addBtn").classList.remove("hidden");
    title_form.innerHTML = "Adicionando produto"
  }

  function CancelChange(){
    document.getElementById("addform").classList.add("hidden");
    nome_input.value = "";
    descricao_input.value = "";
    preco_input.value = "";
  }
  
  async function postJSON(RequestBody) {
    try {
      const response = await fetch("http://127.0.0.1:8080/novo-produto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(RequestBody),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function putJSON(RequestBody, codigo) {
    try {
      const response = await fetch("http://127.0.0.1:8080/altera-produto?codigo="+codigo,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(RequestBody),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function submitAdd(){
    const PostRequestBody = {nome: nome_input.value, descricao: descricao_input.value, preco: preco_input.value}
    postJSON(PostRequestBody);
    CancelChange();
  }

  function DeleteProd(delProd) {
    fetch("http://127.0.0.1:8080/deleta-produto?codigo=" + delProd.codigo, {
      method: "DELETE",
    }).then(() => {
      setProds((oldValues) => {
        return oldValues.filter((prod) => prod !== delProd);
      });
    });
  }

  function AlterProd(produto){
    nome_input.value = "";
    descricao_input.value = "";
    preco_input.value = "";
    document.getElementById("addBtn").classList.add("hidden")
    document.getElementById("addform").classList.remove("hidden");
    document.getElementById("putBtn").classList.remove("hidden");
    nome_input.value = produto.nome
    descricao_input.value = produto.descricao
    preco_input.value = produto.preco
    title_form.classList.add(produto.codigo);
    title_form.innerHTML = "Alterarando produto:" + produto.codigo
  }

  function submitPut(){
    const codigo = title_form.classList.value;
    const PutRequestBody = {nome: nome_input.value, descricao: descricao_input.value, preco: preco_input.value}
    putJSON(PutRequestBody, codigo)
    CancelChange();
  }

  return (
    <div className="Container">
      <h1>Nunes Sports</h1>
          <div className="add__form hidden" id="addform">
              <h3 id="title_form">Adicionar produto</h3>
              <div className="label">
                  <label>Nome:</label>
                  <input 
                      id="nome_input"
                      type="text" 
                      name="nome" 
                      required
                  />
              </div>
              <div className="label">
                  <label>Preço:</label>
                  <input 
                      id="preco_input"
                      type="text"
                      name="preco"
                      required
                  />
              </div>
              <div className="label">
                  <label>Descrição:</label>
                  <textarea 
                      id="descricao_input"
                      type="text"
                      name="descricao"
                      maxLength={255}
                      required
                  >
                  </textarea>
              </div>
              <div className="btn__container">
                <button onClick={submitAdd} className="btn btnA hidden" id="addBtn">Adicionar</button>
                <button onClick={submitPut} className="btn btnA hidden" id="putBtn">Salvar</button>
                <button onClick={CancelChange} className="btn">Cancelar</button>
              </div>
          </div>
          <table className="table__container">
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th></th>
                <th><button onClick={formAdd_show} className="btn btn-tb">Adicionar</button></th>
              </tr>
              {prods.map((produto) => (
                <tr key={produto.codigo}>
                  <td>{produto.codigo}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.descricao}</td>
                  <td>R$ {produto.preco}</td>
                  <td><button onClick={() => AlterProd(produto)} className="btn">Alterar</button></td>
                  <td><button onClick={() => DeleteProd(produto)} className="btn">Deletar</button></td>
                </tr>
              ))}
          </table>
    </div>
  );
}

export default App;