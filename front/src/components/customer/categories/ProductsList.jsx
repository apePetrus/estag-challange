import Common from '../../../scripts/Classes/Common.jsx';

const ProductsList = ({ProductsListing}) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Add to Cart</th>
          </tr>
        </thead>

        <tbody>
          {ProductsListing.map((item) => (
          <tr key={item.code}>
            <td>{item.name}</td>
            <td>{parseFloat(item.price).toFixed(2)}</td>
            <td>{item.amount}</td>
            <td>{item.category_name}</td>
            <td><button onClick={ () => Common.addItems('order_item', {product_code: item.code, amount: 1}) }>Add to Cart</button></td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}

export default ProductsList;
