
// OBTENER USUARIOS GUARDADOS
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

// GUARDAR USUARIOS
function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// CAMBIAR DE PANTALLA
function mostrar(id) {
    document.querySelectorAll(".pantalla").forEach(pantalla => {
        pantalla.classList.remove("activa");
    });

    document.getElementById(id).classList.add("activa");
}

// REGISTRO DE USUARIOS
document.getElementById("formRegistro").addEventListener("submit", function(e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let usuario = document.getElementById("nuevoUsuario").value.trim();
    let correo = document.getElementById("nuevoCorreo").value.trim().toLowerCase();
    let password = document.getElementById("nuevaPassword").value;

    let usuarios = obtenerUsuarios();

    let existe = usuarios.find(u =>
        u.usuario.toLowerCase() === usuario.toLowerCase() ||
        u.correo === correo
    );

    if (existe) {
        alert("El usuario o correo ya está registrado.");
        return;
    }

    usuarios.push({
        nombre: nombre,
        usuario: usuario,
        correo: correo,
        password: password
    });

    guardarUsuarios(usuarios);

    alert("¡Registro realizado correctamente!");

    this.reset();
    mostrar("login");
});

// INICIO DE SESIÓN
document.getElementById("formLogin").addEventListener("submit", function(e) {
    e.preventDefault();

    let identificador = document.getElementById("loginUsuario")
        .value.trim().toLowerCase();

    let password = document.getElementById("loginPassword").value;

    let usuarios = obtenerUsuarios();

    let usuarioEncontrado = usuarios.find(u =>
        (u.usuario.toLowerCase() === identificador ||
        u.correo === identificador) &&
        u.password === password
    );

    if (usuarioEncontrado) {
        document.getElementById("saludoUsuario").textContent =
            "Hola, " + usuarioEncontrado.nombre;

        this.reset();
        mostrar("bienvenida");
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
});

// RECUPERAR NOMBRE DE USUARIO
document.getElementById("formRecuperarUsuario")
.addEventListener("submit", function(e) {
    e.preventDefault();

    let correo = document.getElementById("correoUsuario")
        .value.trim().toLowerCase();

    let usuarios = obtenerUsuarios();

    let encontrado = usuarios.find(u => u.correo === correo);

    let resultado = document.getElementById("resultadoUsuario");

    if (encontrado) {
        resultado.style.color = "green";
        resultado.textContent = "Tu nombre de usuario es: " + encontrado.usuario;
    } else {
        resultado.style.color = "red";
        resultado.textContent = "No existe una cuenta con ese correo.";
    }
});

// RECUPERAR CONTRASEÑA
document.getElementById("formRecuperarPassword")
.addEventListener("submit", function(e) {
    e.preventDefault();

    let correo = document.getElementById("correoPassword")
        .value.trim().toLowerCase();

    let password = document.getElementById("passwordNueva").value;
    let confirmar = document.getElementById("confirmarPassword").value;

    let usuarios = obtenerUsuarios();

    let encontrado = usuarios.find(u => u.correo === correo);

    let resultado = document.getElementById("resultadoPassword");

    if (!encontrado) {
        resultado.style.color = "red";
        resultado.textContent = "El correo no está registrado.";
        return;
    }

    if (password !== confirmar) {
        resultado.style.color = "red";
        resultado.textContent = "Las contraseñas no coinciden.";
        return;
    }

    encontrado.password = password;

    guardarUsuarios(usuarios);

    resultado.style.color = "green";
    resultado.textContent = "¡Contraseña actualizada correctamente!";

    this.reset();
});

// CERRAR SESIÓN
function cerrarSesion() {
    mostrar("login");
    document.getElementById("formLogin").reset();
}
