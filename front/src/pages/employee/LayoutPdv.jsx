import { Outlet, Link } from 'react-router-dom';

const Layout = () => {

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
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
