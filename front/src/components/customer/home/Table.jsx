import { useState, useEffect } from 'react';
import Common from '../../../scripts/Classes/Common.jsx'; 


function Table({Listing, setListing, removeItem, setValues, values}) {

  useEffect(() => {
    const fetchValues = async () => {
      (await Common.getItems("orders")).forEach(e => {
        setValues(values => ({...values, ['total']: e.total, ['tax']: e.tax}))
      })
    }

    fetchValues();
  }, []);


  return (
  <>
    <table id="shoppingCart">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {Listing.map((item) => (
          <tr key={item.code}>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.amount}</td>
            <td>{item.total}</td>
            <td><button onClick={ () => Common.deleteItems('order_item', item.code, setListing, Listing, setValues, values) }>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>

    <form id="shoppingCartBottom">
        <label htmlFor="tax">Tax:</label>
        <input type="number"
               id="tax"
               placeholder={values.tax || "0.00"}
               disabled
        />
        <label htmlFor="total">Total:</label>
        <input type="number"
               id="total"
               placeholder={values.total || "0.00"}
               disabled
        />
        <button type="submit" id="finish" onClick={ () => Common.confirmPurchase(values.tax, values.total) } >Finish</button>
        <button type="button" id="cancel" onClick={ () => Common.deleteItems('order_item', null, setListing, Listing, setValues) }>Cancel</button>
      </form>
  </>
  );
}

export default Table
