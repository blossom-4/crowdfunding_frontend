import LoginForm from "../components/LoginForm";
import "./LoginPage.css";

function LoginPage() {
    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <h1>Welcome to Raise the Case!</h1>
                    <p>
                        Please log in or create a user{" "}
                        <span className="glowing-text">
                            to start pleading your case or using your human right to judge in the court of public opinion!
                        </span>
                    </p>
                </div>

                <div className="login-form-wrap">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
