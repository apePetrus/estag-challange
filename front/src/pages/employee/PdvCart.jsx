import '../../styles/index.css';
import { useState, useEffect } from 'react';

import Form   from '../../components/home/Form.jsx';
import Table  from '../../components/home/Table.jsx';
import Common from '../../scripts/Classes/Common.jsx'


const PdvCart = () => {

  const [Listing, setListing] = useState([]);
  const [values, setValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const subListing = (await Common.getItems('order_item')).slice(0, -1);
      setListing(subListing);
    }
      Common.setFirstOrderCode();
    fetchData();
  }, []);


  return (
  <>
    <section className='app'>

      <section className='store'>

        <Form Listing={Listing} setListing={setListing} setValues={setValues} />

        <div></div>

        <section className='productRight'>

        <Table Listing={Listing} setListing={setListing} setValues={setValues} values={values} />

        </section>

      </section>

      <div id='linha'></div>
    </section>
  </>
  )
};

export default PdvCart;
