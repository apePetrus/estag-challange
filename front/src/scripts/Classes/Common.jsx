class Common{

  static async setFirstOrderCode(){
    const response = (await this.getItems("orders"));
    if (response == false){
      const newOrder = {"total": 0, "tax": 0};
      await this.addItems("orders", newOrder);
    }
    return;
  }


  static capitalize(str, lower = true){  // str == string to be modified; lower = true to make rest of string lowercase;
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
  }


    static correctNameInput(itemName){
    const nameCorrected = itemName.replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/^\s+|\s+$/g,"")  // Removes blank spaces
    .substring(0, 25);  // Limits string size

    return this.capitalize(nameCorrected);
  }


  static deleteRows(table) {
      var rowCount = table.rows.length;
      for (var i = rowCount - 1; i > 0; i--) {
          table.deleteRow(i);
      }
  }


  static async getItems(endpoint, code = null){
    const response = await fetch('http://localhost/' + endpoint + '/' + code,
    {method: 'GET'})
    .then(e => e.json());

    return response;
  }


  static async getParams(endpoint, params = null, values = null){
    const response = await fetch('http://localhost/' + endpoint + '?' + params + '=' + values)
    .then(e => e.json());

    return response;
  }


  static async addItems(endpoint, items){
    try {
      const response = await fetch('http://localhost/' + endpoint, {
        method: 'POST',
        body: JSON.stringify(items)

      }).then((e) => e.json());

      return response;
    } catch (error) {
      window.alert("Invalid inputs.");
    }
  }


  static async updateItems(endpoint, items){
    try {
      const response = await fetch('http://localhost/' + endpoint, {
        method: 'PATCH',
        body: JSON.stringify(items)

      }).then((e) => e.json());

      return response;
    } catch (error) {
      window.alert("Invalid inputs.");
      return false;
    }
  }


  static async confirmPurchase(tax, total){
    if (total == '0.00'){
      window.alert("You can't confirm a purchase with an empty cart.");
      return;
    }
    const sell = {
      "total": total,
      "tax": tax,
    };
    await this.updateItems("orders", sell);
  }


  static async deleteItems(endpoint, code = null, setListing = null, Listing = null, setValues = null, values = null){
    try {
      const response = await fetch('http://localhost/' + endpoint + '/' + code, {
        method: 'DELETE'
      }).then(e => e.json());

      code != null ? setListing(Listing.filter(e => e.code != code)) : setListing([]) ?? setValues({});

      if (values) {
        response.map((e) => {
          setValues(values => ({...values, ['total']: e.total, ['tax']: e.tax}));
        })
      }

      return response;
    } catch (error) {
      window.alert("You can't delete this item because there is another table attatched to it.");
      return false;
    }
  }


}


export default Common;
