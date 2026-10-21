import { API } from "./api.js";

export const login = async (datos) => {
    const res = await fetch(`${API}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });

    return res;
};