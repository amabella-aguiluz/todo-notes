
export const password = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(password)) {
    throw new Error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
    );
    }
}

export default password;

