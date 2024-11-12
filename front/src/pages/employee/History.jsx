import '../../styles/history.css';
import { useState, useEffect } from 'react';

import Orders from '../../components/employee/history/Orders.jsx';
import OrderItems from '../../components/employee/history/OrderItems.jsx';
import Common from '../../scripts/Classes/Common.jsx';

const History = () => {

  const [Listing, setListing] = useState([]);
  const [Details, setDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const subListing = (await Common.getItems('orders')).slice(0, -1);
      setListing(subListing);
    }
    fetchData();
  }, []);


  return (
  <>
    <section className="history">

      <Orders Listing={Listing} Details={Details} setDetails={setDetails} />

      <div></div>


      <section id="historyData">
        <h1>Purchase Details</h1>
      
      <OrderItems Details={Details} />

      </section>

    </section>
  </>
  )
};

export default History;
