import { useState, useEffect } from 'react';
import Common from '../../../scripts/Classes/Common.jsx';


function Form({Listing, setListing}){

  const [inputs, setInputs] = useState({});
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setOptions(await Common.getItems('categories'));
    }

    fetchData();
  }, []);


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = (await Common.addItems('products', inputs));
    if (!data) {
      return;
    }

    setListing([...Listing, data]);
  }


  const displayOptions = options.map(currentOption => (
    <option key={currentOption.code} value={currentOption.code}>
      {currentOption.name}
    </option>
  ))


  return (
  <>
    <form id='productForm' className='addProduct' onSubmit={handleSubmit}>

      <input id='productName'
             type='text'
             placeholder='Product name'
             name='name'
             value={inputs.name || ''}
             onChange={handleChange}
             required
      />
      <input id='amountProduct'
             type='number'
             placeholder='Amount'
             step='1'
             min='1'
             name='amount'
             value={inputs.amount || ''}
             onChange={handleChange}
             required
      />
      <input id='unitPriceProduct'
             type='number'
             placeholder='Price'
             step='0.01'
             min='0.01'
             name='price'
             value={inputs.price || ''}
             onChange={handleChange}
             required
      />
      <select id='categoryProduct'
              name='category_code'
              onChange={handleChange}
              required
      >
        <option value=''></option>
        {displayOptions}
      </select>
      <button id='addProductButton'>Add Product</button>

    </form>
  </>
  );
}

export default Form

