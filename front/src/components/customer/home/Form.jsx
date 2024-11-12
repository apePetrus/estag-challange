import { useState, useEffect } from 'react';
import Common from '../../../scripts/Classes/Common.jsx';


function Form({Listing, setListing, setValues}){

  const [inputs, setInputs] = useState({});
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setOptions(await Common.getItems('products'));
    }

    fetchData();
  }, []);


  async function getMax(code){
    (await Common.getParams('order_item', 'max', code)).forEach(e => {
      const max = e.max;
      setInputs(values => ({...values, ['max']: Number(e.max)}));
    });
  }

 
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }


  const handleProductChange = async (e) => {
    setInputs(values => ({...values, ['tax']: 0}));
    setInputs(values => ({...values, ['price']: 0}));
    setInputs(values => ({...values, ['max']: 0}));

    if (e.target.value) {
      const name = e.target.name;
      const value = e.target.value;
      setInputs(values => ({...values, [name]: value}));

      (await Common.getItems('products', e.target.value)).forEach(e => {
        const tax = e.tax;
        const price = e.price;
        setInputs(values => ({...values, ['tax']: tax}));
        setInputs(values => ({...values, ['price']: price}));
      });

      getMax(e.target.value);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = (await Common.addItems('order_item', inputs));
    if (!data) {
      return;
    }

    getMax(Number(data.product_code));
    setListing([...Listing, data]);
    setValues(values => ({...values, ['total']: data.totalest, ['tax']: data.totaltax}));
  }


  const displayOptions = options.map(currentOption => (
    <option key={currentOption.code} value={currentOption.code}>
      {currentOption.name}
    </option>
  ))


  return (
  <> 
    <form className='productLeft' id='sellForm' onSubmit={handleSubmit}>

      <select id='sellProduct'
              name='product_code'
              onChange={handleProductChange}
              required
      >
        <option value=''/>
        {displayOptions}
      </select>
      <input type='number'
             id='amountCart'
             placeholder='Amount'
             name='amount'
             value={inputs.amount || ''}
             max={inputs.max || ''}
             onChange={handleChange}
      />
      <input type='number'
             id='taxValue'
             placeholder='Tax'
             name='tax'
             value={inputs.tax || ''}
             disabled
      />
      <input type='number'
             id='unitPriceCart'
             placeholder='Price'
             name='price'
             value={inputs.price || ''}
             disabled
      />
      <button type='submit' id='addProductButtonCart'>Add Product</button>

    </form>
  </>
  );
}

export default Form

