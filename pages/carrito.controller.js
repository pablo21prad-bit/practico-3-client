
import { comprar } from "../api/ventas.api.js";

const tabla = document.getElementById("carrito");
const total = document.getElementById("total");
const mensaje = document.getElementById("mensaje");

if (localStorage.getItem("carrito") === null) {
    localStorage.setItem("carrito", JSON.stringify([]));
}

const carrito = JSON.parse(localStorage.getItem("carrito"));

const orden = {
    productos: [],
    total: 0
};

/* mostrar los productos del carrito */
const mostrarCarrito = () => {
    tabla.innerHTML = "";
    mensaje.textContent = "";

    orden.productos = [];
    orden.total = 0;

    for (const producto of carrito) {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td class="p-3">${producto.nombre}</td>

            <td class="p-3">$${producto.precio}</td>

            <td class="p-3">
                <button type="button"
                    class="bg-red-600 text-white px-3 py-2 rounded">
                    Quitar
                </button>
            </td>
        `;

        const boton = fila.querySelector("button");

        boton.addEventListener("click", () => {
            const posicion = carrito.indexOf(producto);

            carrito.splice(posicion, 1);

            localStorage.setItem(
                "carrito",
                JSON.stringify(carrito)
            );

            mostrarCarrito();
        });

        tabla.appendChild(fila);

        orden.productos.push(producto.id_producto);
        orden.total = orden.total + producto.precio;
    }

    total.textContent = orden.total;

    if (carrito.length === 0) {
        mensaje.textContent = "El carrito está vacío";
    }
};

/* realizar una compra */
const botonComprar = document.getElementById("comprar");

botonComprar.addEventListener("click", async () => {

    if (carrito.length === 0) {
        mensaje.textContent = "El carrito está vacío";
        return;
    }

    /* verificar que exista un token */
    const token = sessionStorage.getItem("token");

    if (!token) {
        mensaje.textContent = "Tenés que iniciar sesión para comprar";
        return;
    }

    botonComprar.disabled = true;

    try {
        /* enviar los productos al servidor */
        const res = await comprar({
            productos: orden.productos
        });

        const respuesta = await res.json();

        if (res.status === 201) {

            /* vaciar el carrito */
            carrito.splice(0, carrito.length);

            localStorage.setItem(
                "carrito",
                JSON.stringify(carrito)
            );

            mostrarCarrito();

            alert("Orden creada. Número: " + respuesta.orden.id_venta);

        } else if (res.status === 401 || res.status === 403) {
            mensaje.textContent = "Sesión inválida o vencida. Iniciá sesión nuevamente";

        } else {
            mensaje.textContent = respuesta.message;
        }

    } catch (error) {
        console.log(error);
        mensaje.textContent = "No se pudo realizar la compra";

    } finally {
        botonComprar.disabled = false;
    }
});

mostrarCarrito();
