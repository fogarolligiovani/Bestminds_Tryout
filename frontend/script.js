const url = `http://127.0.0.1:8080/produtos`;

async function loadIntoTable(url, table){
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");
  const response = await fetch(url);
  const data = await response.json();
  console.log(data)

  tableHead.innerHTML = "<tr></tr>";
  tableBody.innerHTML = "";

  for (const headerText of Headers) {
    const headerElement = document.createElement("th");
    headerElement.textContent = headerText;
    tableHead.querySelector("tr").appendchild(headerElement)
  }

}

loadIntoTable(url, document.querySelector("table"));

