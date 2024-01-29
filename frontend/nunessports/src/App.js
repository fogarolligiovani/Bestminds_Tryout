import {useEffect, useState} from "react";
import './App.css';

function App() {
  const [prods, setProds] = useState([]);

  useEffect((prods)=>{
    fetch("127.0.0.1:8080/produtos")
    .then((Response) => Response.json())
    .then((data)=>{
      setProds(data)
      console.log(data);
    });
  }, []
  );

  return (
    <div className="Container">
      <h1>Nunes Sports</h1>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {prods.map((produto) => (
                <tr key={produto.codigo}>
                  <td>{produto.codigo}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.descricao}</td>
                  <td>{produto.preco}</td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  );
}

export default App;
