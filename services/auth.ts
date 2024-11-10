import { SERVER_URL } from "@/envVariables"
import { setItemAsync, getItemAsync } from "expo-secure-store";

export const login = async (email: string, password: string) => {
    const response = await fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok)
        return false;

    const data = await response.json();
    await setItemAsync("token", data.token);
    return true;
}

export const register = async (name: string, email: string, password: string) => {
    const response = await fetch(`${SERVER_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok)
        return false;

    const data = await response.json();
    await setItemAsync("token", data.token);
    return true;
}

export const getJWT = async () => {
    return await getItemAsync("token");
}

export const logout = async () => {
    await setItemAsync("token", "");
}

export const isLoggedIn = async () => {
    const token = await getJWT();
    return token !== null && token !== "";
}