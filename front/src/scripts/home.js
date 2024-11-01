import { getItems, deleteRows, deleteItems, correctNameInput, addItems, lastOrder, getParams } from './main.js';
import Home from '../pages/Home';

const shoppingCart = document.getElementById("shoppingCart");
const sellForm = document.getElementById("sellForm");
const selectProduct = document.getElementById("sellProduct");
refreshTable();
setProducts();


async function setProducts(){
  (await getItems("products")).forEach(e => {
    const option = document.createElement("option");
    option.textContent = e.name;
    option.value = e.code;

    selectProduct.append(option);
  });
}


async function refreshTable(){
  const taxField = document.getElementById("tax");
  const totalField = document.getElementById("total");

  let totalCounter = 0;
  let taxCounter = 0;
  deleteRows(shoppingCart);
  (await getItems("order_item", await lastOrder())).forEach(e => {
    addItemsToTable(e.name, e.price, e.amount, e.total, e.code, e.tax_value);
    totalCounter += Number(e.total);
    taxCounter += Number(e.tax_value);
  });

  taxField.placeholder = taxCounter.toFixed(2);
  totalField.placeholder = totalCounter.toFixed(2);
}


function addItemsToTable(productName, price, amount, total, code){
    const row = shoppingCart.insertRow(-1);
    
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    
    cell1.innerHTML = productName;
    cell2.innerHTML = price;
    cell3.innerHTML = amount;
    cell4.innerHTML = total;
    cell5.innerHTML = `<button id="deleteButton" onclick="removeItem(${code})">Delete</button>`;
}


function removeItem(codeToRemove){
  const itemToDelete = {"code": codeToRemove}
  deleteItems("order_item", itemToDelete);
  window.location.reload();
}


Home.sellProduct.addEventListener("change", async () => {
  const tax = document.getElementById("taxValue");
  const price = document.getElementById("unitPriceCart");
  const amount = document.getElementById("amountCart");

  if (this.sellProduct.value == ""){  // If selection is nothing, then clear the values
    tax.value = "";
    price.value = "";  
    amount.max = 0;
  }
  else (await getItems("products", selectProduct.value)).forEach(async e => {
    tax.value = e.tax;
    price.value = e.price;
    (await getParams("order_item", "max", selectProduct.value)).forEach(e => {
      amount.max = e.max;
    })
  })
});


sellForm.addEventListener("submit", e => {
    e.preventDefault();
    addProductsToCart();
});


async function addProductsToCart(){
  const product_code = document.getElementById("sellProduct").value;
  const amount = document.getElementById("amountCart").value;

  const newOrderItem = {
    "product_code": product_code,
    "amount": amount,
    "order_code": await lastOrder()
  };
  await addItems("order_item", newOrderItem);

  window.location.reload();
}


async function deleteCart(){
  await fetch('http://localhost/order_item', {
    method: 'POST',
    body: JSON.stringify({
      "delete_all": "yes",
      "order_code": await lastOrder()
    })
  })
  window.location.reload();
}


const cancel = document.getElementById("cancel");
cancel.addEventListener("click", () => {
  const confirmation = window.confirm("Do you really wish to cancel your order?");
  if (confirmation){
    deleteCart();
  }
});


const finish = document.getElementById("finish")
finish.addEventListener("click", () => {
    const confirmation = window.confirm("Do you really wish to confirm your order?");
    if (confirmation == true){
      confirmPurchase();
    }
})


async function confirmPurchase(){
  const total = document.getElementById('total').placeholder;
  const tax = document.getElementById('tax').placeholder;
  if (total == '0.00'){
    window.alert("You can't confirm a purchase with an empty cart.");
    window.location.reload();
  }
  const sell = {
    "total": total,
    "tax": tax,
    "code": await lastOrder()
  };
  await addItems("orders", sell);

  window.location.reload(); 
}

/*
TODO-LIST:
DONE - SET ORDER_ITEM DATE IN PHP
???? - VALIDATE IF USER SETS MORE THAN THE MAX AMOUNT IN PHP
DONE - Display order_item info in the html table on load
DONE - When clicking finish, update the orders table and create a new row
DONE - Make the cancel button to work

PRIORITY TO-DO THURSDAYS
DONE - Display item tax and price in the form

 */

