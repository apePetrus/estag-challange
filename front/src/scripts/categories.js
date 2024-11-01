import Categories from '../pages/Categories';
import Common from '../scripts/Classes/Common';


// refreshTable();
//
// async function refreshTable(){
//   Common.deleteRows(Categories.categoriesTable);
//   (await Common.getItems("categories")).forEach(e => {
//     addItemsToTable(e.code, e.name, e.tax);
//   });
// }
//
//
// function addItemsToTable(code, name, tax){
//   const row = Categories.categoriesTable.insertRow(-1);
//
//   const cell1 = row.insertCell(0);
//   const cell2 = row.insertCell(1);
//   const cell3 = row.insertCell(2);
//   const cell4 = row.insertCell(3);
//
//   cell1.innerHTML = code;
//   cell2.innerHTML = name;
//   cell3.innerHTML = tax;
//   cell4.innerHTML = `<button onclick='removeCategory(${code}, "${name}")'>Delete</button>`;
// }


function removeCategory(codeToRemove, nameToRemove){
  const categoryToDelete = {"code": codeToRemove, "name": nameToRemove};
  Common.deleteItems("categories", categoryToDelete);
}


// Categories.categoryForm.addEventListener("submit", e => {
//   e.preventDefault();
//   addCategoryToStorage();
// });


async function addCategoryToStorage(){
  const name = Common.correctNameInput(document.getElementById("categoryName").value);
  const tax = document.getElementById("taxPercent").value;

  const newCategory = {
    "name": name,
    "tax": tax
  };
  await Common.addItems("categories", newCategory);

  window.location.reload();
}
