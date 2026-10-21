import { getProductos } from "../api/productos.api.js";

const contenedor = document.getElementById("productos");
const mensaje = document.getElementById("mensaje");
const categoria = document.getElementById("categoria");

const cargarProductos = async () => {
    contenedor.innerHTML = "";
    mensaje.textContent = "";

    try {
        const res = await getProductos(categoria.value);
        const productos = await res.json();

        for (const producto of productos) {
            const tarjeta = document.createElement("article");

            tarjeta.className = "bg-white rounded-xl shadow p-6";

            tarjeta.innerHTML = `
                <h3 class="text-xl font-bold">
                    ${producto.nombre}
                </h3>

                <p class="text-gray-600 my-3">
                    ${producto.desc}
                </p>

                <p class="text-2xl font-bold text-amber-800 mb-4">
                    $${producto.precio}
                </p>

                <button type="button"
                    class="w-full bg-amber-700 text-white p-3 rounded hover:bg-amber-800">
                    Agregar al carrito
                </button>
            `;

            const boton = tarjeta.querySelector("button");

            if (producto.disponible === false) {
                boton.disabled = true;
                boton.textContent = "No disponible";
                boton.classList.add("opacity-50");
            }

            boton.addEventListener("click", () => {
                if (localStorage.getItem("carrito") === null) {
                    localStorage.setItem("carrito", JSON.stringify([]));
                }

                const carrito = JSON.parse(
                    localStorage.getItem("carrito")
                );

                carrito.push(producto);

                localStorage.setItem(
                    "carrito",
                    JSON.stringify(carrito)
                );

                alert("Producto agregado al carrito");
            });

            contenedor.appendChild(tarjeta);
        }
    } catch (error) {
        console.log(error);
        mensaje.textContent = "No se pudieron cargar los productos";
    }
};

cargarProductos();

categoria.addEventListener("change", cargarProductos);