

function OrderItems({Details}){

  return (
  <>
  <table id="detailsTable">
    <thead>
      <tr>
        <th>Product</th> 
        <th>Tax (%)</th> 
        <th>Amount</th> 
        <th>Total</th>
      </tr>
    </thead>

    <tbody id="detailsTableBody">
      {Details.map((item, index) => {
      if (index < Details.length - 1) {
      return (
        <tr key={item.code}>
          <td>{item.name}</td>
          <td>{item.tax}</td>
          <td>{item.amount}</td>
          <td>{item.total}</td>
        </tr>
      )
      }}
      )}
    </tbody>
  </table>
  </>
  )
}

export default OrderItems;
