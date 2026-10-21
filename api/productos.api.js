import { API } from "./api.js";

export const getProductos = async (categoria) => {
    if (categoria === "todos") {
        const res = await fetch(`${API}/productos`);
        return res;
    } else {
        const res = await fetch(`${API}/productos/categoria/${categoria}`);
        return res;
    }
};