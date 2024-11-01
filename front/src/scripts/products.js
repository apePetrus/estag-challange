import { getItems, deleteRows, deleteItems, correctNameInput, addItems } from './main.js';

const productsTable = document.getElementById("productsTable");
const productForm = document.getElementById("productForm");
const categorySelection = document.getElementById("categoryProduct");
refreshTable();
setCategories();


async function setCategories(){
  (await getItems("categories")).forEach(e => {
    const option = document.createElement("option");
    option.textContent = e.name;
    option.value = e.code;

    categorySelection.append(option);
  });
}


async function refreshTable(){
  deleteRows(productsTable);
  (await getItems("products")).map(e => {
    addItemsToTable(e.code, e.name, e.amount, e.price, e.category_name);
  });
}


function addItemsToTable(code, name, amount, unitPrice, category){
  const row = productsTable.insertRow(-1);

  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);
  const cell6 = row.insertCell(5);

  cell1.innerHTML = code;
  cell2.innerHTML = name;
  cell3.innerHTML = amount;
  cell4.innerHTML = unitPrice;
  cell5.innerHTML = category;
  cell6.innerHTML = `<button id="deleteButton" onclick="removeProduct(${code})">Delete</button>`;
}


productForm.addEventListener("submit", e => {
  e.preventDefault();
  addProductToStorage();
});


async function addProductToStorage(){
  const name = correctNameInput(document.getElementById("productName").value);
  const amount = document.getElementById("amountProduct").value;
  const unitPrice = document.getElementById("unitPriceProduct").value;
  const categoryCode = Number(document.getElementById("categoryProduct").value);

  const newProduct = {
    "name": name,
    "amount": amount,
    "price": unitPrice,
    "category_code": categoryCode
  }
  await addItems("products", newProduct);

  window.location.reload();
}


function removeProduct(codeToRemove){
  const productToDelete = {"code": codeToRemove}
  deleteItems("products", productToDelete);
  window.location.reload();
}
