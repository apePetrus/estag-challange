import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useContext, useState } from 'react';

import PdvHome from './pages/employee/Home';
import StoreHome from './pages/customer/Home';

import LayoutPdv from './pages/employee/Layout';
import PdvProducts from './pages/employee/Products';
import PdvCategories from './pages/employee/Categories';
import PdvHistory from './pages/employee/History';

import LayoutStore from './pages/customer/Layout';
import StoreCategories from './pages/customer/Categories';
import StoreProducts from './pages/customer/Products';


const routerEmployee = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPdv />,
    children: [
      { path: '/', element: <PdvHome /> },
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
      { path: '/', element: <StoreHome /> },
      { path: '/categories', element: <StoreCategories /> },
      { path: '/history', element: <PdvHistory /> },
    ]
  }
]);


function App() {
  return (<RouterProvider router={routerEmployee} />);
}


export default App;

