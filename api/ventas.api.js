import { API } from "./api.js";

export const comprar = async (orden) => {
    const res = await fetch(`${API}/ventas/comprar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orden)
    });

    return res;
};