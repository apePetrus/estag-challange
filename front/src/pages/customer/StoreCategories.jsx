import '../../styles/categories.css';
import { useState, useEffect } from 'react';

import CategoriesList from '../../components/customer/categories/CategoriesList.jsx';
import ProductsList from '../../components/customer/categories/ProductsList.jsx';
import Common from '../../scripts/Classes/Common.jsx';

const Categories = () => {

  const [CategoriesListing, setCategoriesListing] = useState([]);
  const [ProductsListing, setProductsListing] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setCategoriesListing(await Common.getItems('categories'));
      setProductsListing(await Common.getItems('products'));
    }

    fetchData();
  }, []);

  return (
    <>
      <section className='categories'>

        <CategoriesList CategoriesListing={CategoriesListing} setProductsListing={setProductsListing} />

        <div></div>

        <ProductsList ProductsListing={ProductsListing} />

      </section>
    </>
  )
}

export default Categories;
