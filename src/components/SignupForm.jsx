import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignup from "../api/post-signup.js";
import postLogin from "../api/post-login.js";
import { useAuth } from "../hooks/use-auth.js";
import "./SignupForm.css";

function SignupForm() {
    const navigate = useNavigate();
    const { setAuthUser } = useAuth();
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");

        // Validation
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        postSignup(
            formData.username,
            formData.email,
            formData.firstName,
            formData.lastName,
            formData.password
        )
            .then(() => {
                // Auto-login after signup
                return postLogin(formData.username, formData.password);
            })
            .then((response) => {
                window.localStorage.setItem("token", response.token);
                window.localStorage.setItem("userId", response.user_id);
                window.localStorage.setItem("username", response.username);
                setAuthUser({
                    token: response.token,
                    userId: response.user_id,
                    username: response.username,
                });
                navigate("/");
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupForm;
