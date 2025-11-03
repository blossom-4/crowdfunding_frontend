import { Link, Outlet } from "react-router-dom";
import "./NavBar.css";
import { useAuth } from "../hooks/use-auth.js";
import logo from "../assets/logo-2-e.png";

function NavBar() {
    const { auth, setAuth } = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setAuth({ token: null });
    };

    return (
        <>
            <div className="ribbon">
                <nav className="navbar">
                    <div className="logo-container">
                        <Link to="/">
                            <img src={logo} alt="Raise The Case Logo" className="navbar-logo" />
                        </Link>
                        <span className="logo-text">Raise The Case</span>
                    </div>

                    <ul className="nav-list">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/create-a-case">Create a Case</Link></li>
                        {auth.token ? (
                            <li>
                                <Link to="/" onClick={handleLogout}>Log Out</Link>
                            </li>
                        ) : (
                            <li>
                                <Link to="/login">Login</Link>
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