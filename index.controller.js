
import { login } from "./api/login.api.js";

const formulario = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = {
        user: document.getElementById("user").value,
        pass: document.getElementById("pass").value
    };

    try {
        const res = await login(datos);
        const respuesta = await res.json();

        if (res.status === 200) {

            /* guardamos los datos del usuario */
            sessionStorage.setItem("user", JSON.stringify(respuesta.usuario));

            /* guardamos el token JWT */
            sessionStorage.setItem("token", respuesta.token);

            /* redirigimos a la página principal */
            window.location.href = "./pages/home.html";

        } else {
            mensaje.textContent = respuesta.message;
        }

    } catch (error) {
        console.log(error);
        mensaje.textContent = "No se pudo conectar con el servidor";
    }
});
