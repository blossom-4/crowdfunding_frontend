import LoginForm from "../components/LoginForm";

function LoginPage() {
    return (
    <div>
        <h1>Welcome to Raise the Case! </h1>
        <p>Please log in or create a user <span class="glowing-text">to start pleading your case or using your human right to judge in the public court of opinion!</span></p>
    <LoginForm />
    </div>
); 
}

export default LoginPage;