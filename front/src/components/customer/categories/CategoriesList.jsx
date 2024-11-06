import Common from '../../../scripts/Classes/Common.jsx';

const CategoriesList = ({CategoriesListing, setProductsListing}) => {

  const handleList = async (code) => {
    setProductsListing(await Common.getParams('products', 'category', code));
  }


  const handleReset = async () => {
    setProductsListing(await Common.getItems('products'));
  }


  return (
    <>
      <table>

        <thead>
          <tr>
            <th>Category</th>
            <th>Tax</th>
            <th>View Products <button onClick={ handleReset }>Reset Filter</button></th>
          </tr>
        </thead>

        <tbody>
          {CategoriesListing.map((item) => (
          <tr key={item.code}>
            <td>{item.name}</td>
            <td>{parseFloat(item.tax).toFixed(2)}</td>
            <td><button onClick={ () => handleList(item.code) }>View</button></td>
          </tr>
        ))}
        </tbody>

      </table>
    </>
  )
}

export default CategoriesList;
