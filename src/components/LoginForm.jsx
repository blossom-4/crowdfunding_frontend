import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import postLogin from "../api/post-login.js";
import { useAuth } from "../hooks/use-auth.js";

function LoginForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuthUser } = useAuth();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) {
            postLogin(
                credentials.username,
                credentials.password
            ).then((response) => {
                setAuthUser({
                    token: response.token,
                    userId: response.user_id,
                    username: response.username,
                });
                const from = location.state?.from || "/";
                navigate(from);
            });
        }
    };

    return (
        <form className="login-form">
            <div>
                <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                placeholder="Enter username"
                onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                placeholder="Enter password"
                onChange={handleChange}
            />
        </div>
        <button type="submit" onClick={handleSubmit}>
            Login
        </button>
        <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </form>
    );
}

export default LoginForm;