import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import "./NavBar.css";
import { useAuth } from "../hooks/use-auth.js";
import logo from "../assets/logo_3.png";

function NavBar() {
    const { auth, setAuth } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        try {
            window.localStorage.removeItem("token");
            setAuth({ token: null });
            setMenuOpen(false);
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <div className="ribbon">
                <nav className="navbar">
                    <div className="logo-container">
                        <Link to="/" onClick={closeMenu}>
                            <img src={logo} alt="Raise The Case - Justice Crowdfunding Platform Logo" className="navbar-logo" />
                        </Link>
                    </div>

                    <button className={`hamburger ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <ul className={`nav-list ${menuOpen ? "active" : ""}`}>
                        <li><NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>Home</NavLink></li>
                        <li><NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>About</NavLink></li>
                        <li><NavLink to="/create-a-case" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>Raise a Case</NavLink></li>
                        {auth.token ? (
                            <li>
                                <button onClick={handleLogout} className="logout-btn" aria-label="Logout from your account">
                                    Log Out
                                </button>
                            </li>
                        ) : (
                            <li>
                                <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>Login</NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
            <Outlet />
        </>
    );
}

export default NavBar;