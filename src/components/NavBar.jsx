import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useId, useRef, useState } from "react";
import "./NavBar.css";
import { useAuth } from "../hooks/use-auth.js";
import logo from "../assets/COURT_OF_PUBLIC_OPINION4.png";

function NavBar() {
    const { auth, setAuth } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const location = useLocation();
    const navId = useId(); // React 18+ unique id
    const navListId = `nav-list-${navId}`;

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

    // Close menu on route change (great UX on mobile)
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
            const navEl = navRef.current;
            if (!navEl) return;

            if (!navEl.contains(e.target)) {
                closeMenu();
            }
        };

        document.addEventListener("pointerdown", onPointerDown);
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [menuOpen]);

    // Lock body scroll when mobile menu open (prevents awkward scrolling)
    useEffect(() => {
        if (!menuOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [menuOpen]);

    const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

    const ctaClass = ({ isActive }) =>
        isActive ? "nav-link nav-cta active" : "nav-link nav-cta";

    return (
        <>
            <header className="ribbon">
                <nav className="navbar" ref={navRef} aria-label="Primary" role="navigation">
                    {/* Logo */}
                    <div className="logo-container">
                        <Link to="/" aria-label="Go to homepage">
                            <img
                                src={logo}
                                alt="Raise The Case - Justice Crowdfunding Platform Logo"
                                className="navbar-logo"
                                draggable="false"
                            />
                            <span className="logo-text">Raise The Case</span>
                        </Link>
                    </div>

                    {/* Hamburger */}
                    <button
                        ref={hamburgerRef}
                        className={`hamburger ${menuOpen ? "active" : ""}`}
                        onClick={toggleMenu}
                        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={menuOpen}
                        aria-controls={navListId}
                        type="button"
                    >
                        <span />
                        <span />
                        <span />
                    </button>

                    {/* Nav links */}
                    <ul id={navListId} className={`nav-list ${menuOpen ? "active" : ""}`}>
                        <li>
                            <NavLink to="/" className={linkClass}>
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/about" className={linkClass}>
                                About
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/create-a-case" className={ctaClass}>
                                Raise a Case
                            </NavLink>
                        </li>

                        {auth?.token ? (
                            <li>
                                <button
                                    type="button"
                                    className="nav-link"
                                    onClick={handleLogout}
                                    aria-label="Log out of your account"
                                >
                                    Log Out
                                </button>
                            </li>
                        ) : (
                            <li>
                                <NavLink to="/login" className={linkClass}>
                                    Login
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>

            <Outlet />
        </>
    );
}

export default NavBar;
