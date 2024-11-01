import '../styles/categories.css';
import { useState, useEffect } from 'react';

import Form   from '../components/categories/Form.jsx';
import Table  from '../components/categories/Table.jsx';
import Common from '../scripts/Classes/Common.jsx';


const Categories = () => {

  const [Listing, setListing] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setListing(await Common.getItems('categories'));
    }

    fetchData();
  }, []);


  return (
  <>
    <section className='categories'>
      <Form Listing={Listing} setListing={setListing} />

      <div></div>

      <Table Listing={Listing} setListing={setListing} />
    </section>
  </>
  )
};

export default Categories;
