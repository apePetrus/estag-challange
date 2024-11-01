lastOrder();


export async function lastOrder(){
  const response = (await getItems("orders"));
  if (response == false){
    const newOrder = {"total": 0, "tax": 0};
    await addItems("orders", newOrder);
   
    window.location.reload();
  }
  return response[response.length - 1].code;
}


const capitalize = (str, lower = true) =>  // str == string to be modified; lower = true to make rest of string lowercase;
(lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());


export function correctNameInput(itemName){  // Prevent HTML and JS injection
  const nameCorrected = itemName.replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/^\s+|\s+$/g,"")  // Removes blank spaces
  .substring(0, 25);  // Limits string size

  return capitalize(nameCorrected);
}


export function deleteRows(table) {
    var rowCount = table.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}


export async function getItems(endpoint, code = null){
  const response = await fetch('http://localhost/' + endpoint + '/' + code,
  {method: 'GET'})
  .then(e => e.json());

  return response;
}


export async function getParams(endpoint, params = null, values = null){
  const response = await fetch('http://localhost/' + endpoint + '?' + params + '=' + values)
  .then(e => e.json());

  return response;
}


export async function addItems(endpoint, items){
  const response = await fetch('http://localhost/' + endpoint, {
    method: 'POST',
    body: JSON.stringify(items)
  });

  const data = await response.text();
  if (data.replace(/["]+/g, '') == '1'){
    window.alert("Name and/or tax are invalid.");
  }
}


export async function deleteItems(endpoint, items){
  const response = await fetch('http://localhost/' + endpoint, {
    method: 'POST',
    body: JSON.stringify(items)
  })
  .then(e => e.json());

 
  if (response == '1'){
    window.alert("You can't delete this item because there is another table attatched to it.");
  }

  window.location.reload();
}

