import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import postSignup from "../api/post-signup.js";
import postLogin from "../api/post-login.js";
import { useAuth } from "../hooks/use-auth.js";
import "./SignupForm.css";

const MIN_PASSWORD_LENGTH = 6;

function SignupForm() {
    const navigate = useNavigate();
    const location = useLocation();
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

        setError("");

        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const passwordLongEnough = formData.password.length >= MIN_PASSWORD_LENGTH;
    const passwordsMatch =
        formData.password.length > 0 &&
        formData.password === formData.confirmPassword;

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");

        if (
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("All required fields must be filled in.");
            return;
        }

        if (!passwordLongEnough) {
            setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
            return;
        }

        if (!passwordsMatch) {
            setError("Passwords do not match.");
            return;
        }

        postSignup(
            formData.username,
            formData.email,
            formData.firstName,
            formData.lastName,
            formData.password
        )
            .then(() => postLogin(formData.username, formData.password))
            .then((response) => {
                window.localStorage.setItem("token", response.token);
                window.localStorage.setItem("userId", response.user_id);
                window.localStorage.setItem("username", response.username);

                setAuthUser({
                    token: response.token,
                    userId: response.user_id,
                    username: response.username,
                });

                const from = location.state?.from || "/";
                navigate(from);
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} noValidate>
                {error && <div className="error-message">{error}</div>}

                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" value={formData.username} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" value={formData.email} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" value={formData.firstName} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" value={formData.lastName} onChange={handleChange} />
                </div>

                {/* PASSWORD */}
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        aria-describedby="password-rules"
                    />

                    <ul className="password-rules" id="password-rules">
                        <li className={passwordLongEnough ? "valid" : ""}>
                            At least {MIN_PASSWORD_LENGTH} characters
                        </li>
                    </ul>
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                    {formData.confirmPassword.length > 0 && (
                        <p className={`match-message ${passwordsMatch ? "valid" : ""}`}>
                            {passwordsMatch ? "Passwords match ✔" : "Passwords do not match"}
                        </p>
                    )}
                </div>

                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}

export default SignupForm;
