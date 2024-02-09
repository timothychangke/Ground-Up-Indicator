import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

export function Navbar() {
    const { user } = useContext(UserContext);
    return (
        <>
            {!user && <></>}
            {user && (
                <div className="flex align-middle space-x-28 items-center bg-white">
                    <img
                        src="https://patron.groundupinitiative.org/wp-content/uploads/2020/12/Logo.png"
                        alt="gui logo"
                        className="w-24"
                    />
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/tracker">Tracker</NavLink>
                    <NavLink to="/naturetracker">Nature Tracker</NavLink>
                    <NavLink to="/sentiment">Sentiment</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </div>
            )}
        </>
    );
}
export default Navbar;
