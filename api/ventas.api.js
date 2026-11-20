
import { API } from "./api.js";

export const comprar = async (orden) => {

    /* obtenemos el token del usuario */
    const token = sessionStorage.getItem("token");

    if (!token) {
        throw new Error("Tenés que iniciar sesión para comprar");
    }

    const res = await fetch(`${API}/ventas/comprar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(orden)
    });

    return res;
};
