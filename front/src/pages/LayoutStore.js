import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  const handleLayout = () => {
    localStorage.setItem("admin", true);
  }
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          {/* <li> */}
          {/*   <Link to="/pdv">PDV</Link> */}
          {/* </li> */}
          <li>
            <button onClick={handleLayout}>Change Layout</button>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
}

export default Layout;
