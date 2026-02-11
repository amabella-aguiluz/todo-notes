import RegisterInput from "./components/register_input";
import AuthPage from "./components/auth_page";

export const RegisterPage = () => {
    return (
    <AuthPage type="Register" typeInput={<RegisterInput />} />
    );
} ;

export default RegisterPage;