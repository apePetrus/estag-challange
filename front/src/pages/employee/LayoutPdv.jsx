import { Outlet, Link } from 'react-router-dom';

const Layout = () =>{
  const handleLayout = () => {
    localStorage.setItem("admin", false);
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Shopping Cart</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
          <li> 
            <button onClick={handleLayout}>Change Layout</button>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
