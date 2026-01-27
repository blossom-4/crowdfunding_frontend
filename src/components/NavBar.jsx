import { Link, NavLink, Outlet } from "react-router-dom";
import "./NavBar.css";
import { useAuth } from "../hooks/use-auth.js";
import logo from "../assets/logo-2-e.png";

function NavBar() {
    const { auth, setAuth } = useAuth();

    const handleLogout = () => {
        try {
            window.localStorage.removeItem("token");
            setAuth({ token: null });
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <>
            <div className="ribbon">
                <nav className="navbar">
                    <div className="logo-container">
                        <Link to="/">
                            <img src={logo} alt="Raise The Case - Justice Crowdfunding Platform Logo" className="navbar-logo" />
                        </Link>
                        <span className="logo-text">Raise The Case</span>
                    </div>

                    <ul className="nav-list">
                        <li><NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink></li>
                        <li><NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>About</NavLink></li>
                        <li><NavLink to="/create-a-case" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Create a Case</NavLink></li>
                        {auth.token ? (
                            <li>
                                <button onClick={handleLogout} className="logout-btn" aria-label="Logout from your account">
                                    Log Out
                                </button>
                            </li>
                        ) : (
                            <li>
                                <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Login</NavLink>
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