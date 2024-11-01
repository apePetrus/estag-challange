import { BrowserRouter, Routes, Route,createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useContext, useState } from 'react';


import LayoutPdv from './pages/LayoutPdv';
import PdvCart from './pages/PdvCart';
import Products from './pages/Products';
import PdvCategories from './pages/Categories';
import History from './pages/History';




// FUTURE STUFF TO WORK WITH
//
//
import { createContext } from 'react';
import LayoutStore from './pages/LayoutStore';
import Home from './pages/Home.js';
import StoreCategories from './pages/StoreCategories';
import Pdv from './pages/Pdv';

// const RouterContext = createContext();

const routerCustomer = createBrowserRouter([
  {
    path: '/',
    element: <LayoutStore />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/categories', element: <StoreCategories /> },
      // { path: '/', element: <Pdv /> }, 
    ],
  },
]);
//
//
// END OF FUTURE STUFF TO WORK WITH



const routerEmployee = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPdv />,
    children: [
      { path: '/', element: <PdvCart /> },
      { path: '/products', element: <Products /> },
      { path: '/categories', element: <PdvCategories /> },
      { path: '/history', element: <History /> },
    ]
  }
]);

function App() {
  // const [ routerLayout, setRouterLayout ] = useContext(RouterContext);

  return (
      <RouterProvider router={routerEmployee} />

  );
}




export default App;
