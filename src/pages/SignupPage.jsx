import SignupForm from "../components/SignupForm";
import "./SignupPage.css";

function SignupPage() {
    return (
        <div className="signup-page">
            <div className="signup-card">
                <div className="signup-header">
                    <h1>Create Your Account</h1>
                    <p>
                        Join us to plead your case or make judgements in the court of public opinion!
                    </p>
                </div>

                <div className="signup-form-wrap">
                    <SignupForm />
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
