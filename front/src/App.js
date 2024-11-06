import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useContext, useState } from 'react';

import PdvCart from './pages/employee/PdvCart';

import LayoutPdv from './pages/employee/LayoutPdv';
import PdvProducts from './pages/employee/Products';
import PdvCategories from './pages/employee/Categories';
import PdvHistory from './pages/employee/History';

import LayoutStore from './pages/customer/LayoutStore';
import StoreCategories from './pages/customer/StoreCategories';
import StoreProducts from './pages/customer/StoreProducts';


const routerEmployee = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPdv />,
    children: [
      { path: '/', element: <PdvCart /> },
      { path: '/products', element: <PdvProducts /> },
      { path: '/categories', element: <PdvCategories /> },
      { path: '/history', element: <PdvHistory /> },
    ]
  }
]);


const routerCustomer = createBrowserRouter([
  {
    path: '/',
    element: <LayoutStore />,
    children: [
      { path: '/', element: <PdvCart /> },
      { path: '/categories', element: <StoreCategories /> },
      { path: '/history', element: <PdvHistory /> },
    ]
  }
]);


function App() {
  return (<RouterProvider router={routerEmployee} />);
}


export default App;

