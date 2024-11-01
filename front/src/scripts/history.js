import { getItems, deleteRows, deleteItems, correctNameInput, addItems } from './main.js';

const detailsTable = document.getElementById("detailsTable");
const historyTable = document.getElementById("historyTable");
refreshTable();


async function refreshTable(){
  deleteRows(historyTable);
  const subArr = (await getItems("orders")).slice(0, -1);
  subArr.forEach(e => {
      addItemsToTable(e.code, e.tax, e.total, e.historydate);
  });
}


function addItemsToTable(code, tax, total, historydate){
  const row = historyTable.insertRow(-1);
  
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);

  cell1.innerHTML = code;
  cell2.innerHTML = tax;
  cell3.innerHTML = total;
  cell4.innerHTML = historydate;
  cell5.innerHTML = `<button onclick="viewDetails(${code})">View</button>`
}


async function viewDetails(code){
  deleteRows(detailsTable);

  (await getItems("order_item", code)).forEach(e => {
    const row = this.detailsTableBody.insertRow(-1);

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.innerHTML = e.code;
    cell2.innerHTML = e.name;
    cell3.innerHTML = e.tax_value;
    cell4.innerHTML = e.amount;
    cell5.innerHTML = Number(e.total) + Number(e.tax_value);
  });
}
