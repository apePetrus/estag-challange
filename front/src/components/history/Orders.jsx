import Common from '../../scripts/Classes/Common.jsx'

import { useState, useEffect } from 'react';

function Orders({Listing, Details, setDetails}){
  
  async function viewDetails(code){
    const data = (await Common.getItems("order_item", code));
    setDetails(data);
  }

  return (
  <>
    <section id="historyView">

      <table id="historyTable">
        <thead>
          <tr>
            <th>Code</th>
            <th>Tax</th>
            <th>Total</th>
            <th>Date</th> 
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          {Listing.map((item) => ( 
            <tr key={item.code}>
              <td>{item.code}</td>
              <td>{item.tax}</td>
              <td>{item.total}</td>
              <td>{item.historydate}</td>
              <td><button onClick={ () => viewDetails(item.code) }>Details</button></td>
            </tr>
            ))}
        </tbody>
      </table>

    </section>
  </>
  )
};

export default Orders;
