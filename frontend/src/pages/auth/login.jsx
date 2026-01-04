import LoginInput from "./components/login_input";
import AuthPage from "./components/auth_page";

export const LoginPage = () => {
    return (
    <AuthPage type="Login" typeInput={<LoginInput />} />
    );
} ;

export default LoginPage;