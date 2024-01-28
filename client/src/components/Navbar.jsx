import { NavLink } from 'react-router-dom';

export function Navbar() {
    return <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>;
}
 export default Navbar