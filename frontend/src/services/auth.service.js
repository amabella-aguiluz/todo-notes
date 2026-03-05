import { api } from "../api/api";

export const register = async (email, password, passwordConfirm) => {
    const {data} = await api.post("auth/register", { email, password, passwordConfirm });
    return data;
}

export const login = async (email, password) => {
    const {data} = await api.post("auth/login", { email, password });

    if (data?.token) {
    localStorage.setItem("token", data.token); 
    // attach token to interceptor in api.js
  }

    return data;
}

export const authApi = {
    register,
    login
}