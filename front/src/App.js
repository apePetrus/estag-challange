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


//
//
// END OF FUTURE STUFF TO WORK WITH




function App() {

  const [ routerLayout, setRouterLayout ] = useState();

  const routerEmployee = createBrowserRouter([
    {
      path: '/',
      element: <LayoutPdv routerLayout={routerLayout}/>,
      children: [
        { path: '/', element: <PdvCart /> },
        { path: '/products', element: <Products /> },
        { path: '/categories', element: <PdvCategories /> },
        { path: '/history', element: <History /> },
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
        // { path: '/', element: <Pdv /> }, 
      ],
    },
  ]);

  // setRouterLayout({routerEmployee})

  return (
      <RouterProvider router={routerCustomer} />

  );
}




export default App;
