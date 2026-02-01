import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import "./NavBar.css";
import { useAuth } from "../hooks/use-auth.js";
import logo from "../assets/COURT_OF_PUBLIC_OPINION.png";

function NavBar() {
    const { auth, setAuth } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const location = useLocation();
    const navId = useId();
    const navListId = useMemo(() => `nav-list-${navId}`, [navId]);

    const navRef = useRef(null);
    const hamburgerRef = useRef(null);

    const closeMenu = () => setMenuOpen(false);
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const handleLogout = () => {
        try {
            window.localStorage.removeItem("token");
            setAuth({ token: null });
            closeMenu();
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    // Close mobile menu on route change
    useEffect(() => {
        closeMenu();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    // ESC closes menu
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                closeMenu();
                hamburgerRef.current?.focus();
            }
        };
        if (menuOpen) window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [menuOpen]);

    // Click outside closes menu
    useEffect(() => {
        const onPointerDown = (e) => {
            if (!menuOpen) return;
            if (navRef.current && !navRef.current.contains(e.target)) closeMenu();
        };
        document.addEventListener("pointerdown", onPointerDown);
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [menuOpen]);

    const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

    return (
        <>
            <header className="ribbon">
                <nav className="navbar" ref={navRef} aria-label="Primary navigation">
                    {/* LEFT: Logo */}
                    <div className="nav-left">
                        <Link to="/" className="logo-link" aria-label="Go to homepage">
                            <img src={logo} alt="Raise The Case logo" className="navbar-logo" draggable="false" />
                            <span className="logo-text">Raise The Case</span>
                        </Link>
                    </div>

                    {/* CENTER: Desktop menu (always visible on desktop) */}
                    <ul className="nav-center" aria-label="Site links">
                        <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
                        <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
                        <li><NavLink to="/create-a-case" className={linkClass}>Raise a Case</NavLink></li>
                    </ul>

                    {/* RIGHT: Desktop auth + Mobile hamburger */}
                    <div className="nav-right">
                        {/* Desktop auth link */}
                        {auth?.token ? (
                            <button type="button" className="nav-link nav-auth" onClick={handleLogout}>
                                Log Out
                            </button>
                        ) : (
                            <NavLink to="/login" className={({ isActive }) =>
                                isActive ? "nav-link nav-auth active" : "nav-link nav-auth"
                            }>
                                Login
                            </NavLink>
                        )}

                        {/* Mobile hamburger */}
                        <button
                            ref={hamburgerRef}
                            className={`hamburger ${menuOpen ? "active" : ""}`}
                            onClick={toggleMenu}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            aria-controls={navListId}
                            type="button"
                        >
                            <span />
                            <span />
                            <span />
                        </button>

                        {/* Mobile dropdown menu */}
                        <ul id={navListId} className={`nav-list ${menuOpen ? "active" : ""}`}>
                            <li><NavLink to="/" className={linkClass} onClick={closeMenu}>Home</NavLink></li>
                            <li><NavLink to="/about" className={linkClass} onClick={closeMenu}>About</NavLink></li>
                            <li><NavLink to="/create-a-case" className={linkClass} onClick={closeMenu}>Raise a Case</NavLink></li>

                            <li>
                                {auth?.token ? (
                                    <button type="button" className="nav-link" onClick={handleLogout}>
                                        Log Out
                                    </button>
                                ) : (
                                    <NavLink to="/login" className={linkClass} onClick={closeMenu}>
                                        Login
                                    </NavLink>
                                )}
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <Outlet />
        </>
    );
}

export default NavBar;
