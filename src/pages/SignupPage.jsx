import SignupForm from "../components/SignupForm";
import "./SignupPage.css";

function SignupPage() {
    return (
        <div className="signup-message">
            <h1>Create Your Account</h1>
            <p>Join us to plead your case or make judgements in the court of public opinion!</p>
            <SignupForm />
        </div>
    );
}

export default SignupPage;
