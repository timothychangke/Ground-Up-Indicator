import { NavLink } from 'react-router-dom';

export function Navbar() {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/tracker">Tracker</NavLink>
            <NavLink to='/naturetracker'>Nature Tracker</NavLink>
        </nav>
    );
}
export default Navbar;
