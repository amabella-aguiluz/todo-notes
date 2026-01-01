import LoginInput from "./components/login_input";
import AuthPage from "./components/auth_page";

export const LoginPage = () => {
    return (
    <AuthPage id="#login" type="Login" typeInput={<LoginInput />} />
    );
} ;

export default LoginPage;