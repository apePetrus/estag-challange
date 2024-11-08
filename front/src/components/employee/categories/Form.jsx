import { useState } from 'react';
import Common from '../../../scripts/Classes/Common.jsx';


function Form({Listing, setListing}){

  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = (await Common.addItems('categories', inputs));
    if (!data) {
      return;
    }

    console.log(data);
    setListing([...Listing, data]);
  }


  return (
  <>
    <form id='categoryForm' className='categoriesForm' onSubmit={handleSubmit}>

      <input id='categoryName'
            type='text'
            placeholder='Category name'
            name='name'
            value={inputs.name || ''}
            onChange={handleChange}
            required
      />
      <input id='taxPercent'
            type='number'
            placeholder='Tax'
            step='0.01'
            min='0'
            name='tax'
            value={inputs.tax || ''}
            onChange={handleChange}
            required
      />
      <button id='addCategory'>Add Category</button>

    </form>
  </>
  );
}

export default Form

