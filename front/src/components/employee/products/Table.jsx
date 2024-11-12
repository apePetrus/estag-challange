import { useState, useEffect } from 'react';
import Common from '../../../scripts/Classes/Common.jsx'; 


function Table({Listing, setListing, removeItem}) {
  return (
  <>
    <table id='productsTable' className='productTable'>
      <thead> 
        <tr>
          <th>Code</th>
          <th>Product</th>
          <th>Amount</th>
          <th>Unit price</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {Listing.map((item) => (
          <tr key={item.code}>
            <td>{item.code}</td>
            <td>{item.name}</td>
            <td>{item.amount} </td>
            <td>{parseFloat(item.price).toFixed(2)}</td>
            <td>{item.category_name}</td>
            <td><button onClick={ () => Common.deleteItems('products', item.code, setListing, Listing) }>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
  );
}

export default Table

