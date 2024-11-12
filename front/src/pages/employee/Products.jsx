import '../../styles/products.css';
import { useState, useEffect } from 'react';

import Form   from '../../components/employee/products/Form.jsx';
import Table  from '../../components/employee/products/Table.jsx';
import Common from '../../scripts/Classes/Common.jsx'


const Products = () => {

  const [Listing, setListing] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setListing(await Common.getItems('products'));
    }

    fetchData();
  }, []);


  return (
  <>
    <section className='products'>
      <Form Listing={Listing} setListing={setListing} />

      <div></div>

      <Table Listing={Listing} setListing={setListing} />
    </section>
  </>
  )
};

export default Products;
