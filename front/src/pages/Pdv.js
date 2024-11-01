import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LayoutPdv from './LayoutPdv';
import PdvCart from './PdvCart';
import Products from './Products';
import Categories from './Categories';
import History from './History';

function Pdv() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<LayoutPdv />}>
          <Route index element={<PdvCart />} />
          <Route path='products' element={<Products />} />
          <Route path='categories' element={<Categories />} />
          <Route path='history' element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Pdv;
