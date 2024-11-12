import Common from '../../../scripts/Classes/Common.jsx'; 


function Table({Listing, setListing}) {
  return (
  <>
    <table id='categoriesTable' className='categoriesTable'>

      <thead>
        <tr>
          <th>Code</th>
          <th>Category</th>
          <th>Tax (%)</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {Listing.map((item) => (
          <tr key={item.code}>
            <td>{item.code}</td>
            <td>{item.name}</td>
            <td>{parseFloat(item.tax).toFixed(2)}</td>
            <td><button onClick={ () => Common.deleteItems('categories', item.code, setListing, Listing) }>Delete</button></td>
          </tr>
        ))}
      </tbody>

    </table>
  </>
  );
}

export default Table

