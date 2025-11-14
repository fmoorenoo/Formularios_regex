const btnGuardar = document.getElementById('btnguardar');
btnGuardar.disabled = true;
const btnRecuperar = document.getElementById('btnrecuperar');
const infoMsg = document.querySelector('.info-msg');


// Objeto de patrones de REGEX.
const patterns = {
    nombre: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+$/u,
    apellidos: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?$/u,
    dninie: /^(?:\d{8}[A-HJ-NP-TV-Z]|[XYZ]\d{7}[A-HJ-NP-TV-Z])$/i,
    nacimiento: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/,
    postal: /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    fijo: /^(8|9)\d{8}$/,
    movil: /^(6|7)\d{8}$/,
    iban: /^ES\d{22}$/,
    credito: /^\d{13,19}$/,
    contrasena: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,}$/,
    repcontrasena: /.*/
};


//// Declaramos la constante 'inputs' que contendrá la colección de inputs. 
const form = document.querySelector('#formulario').addEventListener('submit', (e) => {
    e.preventDefault();
});
const inputs = document.querySelectorAll('input');


//// Haciendo uso del método forEach, añadimos el evento keyup a cada uno de los inputs de la colección '(input)'.
inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        if (e.target.attributes.name.value.trim() != "") {
            validate(e.target, patterns[e.target.attributes.name.value]);
        }
    });
});


function validate(campo, regex) {
    const contenedor = campo.parentElement;

    const mensajes = {
        nombre: "El nombre debe empezar con mayúscula y solo letras.",
        apellidos: "Máximo dos apellidos y deben empezar con mayúscula.",
        dninie: "DNI/NIE inválido.",
        nacimiento: "El formato debe ser dd/mm/aaaa",
        postal: "Código postal inválido.",
        email: "Formato de email inválido.",
        fijo: "Debe empezar por 8 o 9, y deben ser 9 dígitos.",
        movil: "Debe empezar por 6 o 7, y deben ser 9 dígitos.",
        iban: "IBAN incorrecto. Debe ser 'ES', seguido de 22 dígitos.",
        credito: "Tarjeta no válida. Debe tener entre 13 y 19 dígitos",
        contrasena: "Debe tener 12 caracteres incluyendo letra, número y símbolo."
    };

    let mensaje = contenedor.querySelector('.mensaje-error');

    if (!mensaje) {
        mensaje = document.createElement('div');
        mensaje.classList.add('mensaje-error');
        contenedor.appendChild(mensaje);
    }

    if (campo.value.trim() === "") {
        campo.classList.remove('valido', 'invalido');
        mensaje.textContent = "";
        mensaje.style.display = "none";
        return;
    }

    if (regex.test(campo.value)) {
        campo.classList.remove('invalido');
        campo.classList.add('valido');

        mensaje.textContent = "";
        mensaje.style.display = "none";
    } else {
        campo.classList.remove('valido');
        campo.classList.add('invalido');

        mensaje.textContent = mensajes[campo.name] || "El valor introducido no es válido";
        mensaje.style.display = "block";
    }

    // Verificar que repetir contraseña sea igual a contraseña
    if (campo.name === "repcontrasena") {
        const contrasena = document.querySelector('input[name="contrasena"]');

        if (campo.value === contrasena.value && campo.value !== "") {
            campo.classList.remove('invalido');
            campo.classList.add('valido');
            mensaje.textContent = "";
            mensaje.style.display = "none";
        } else {
            campo.classList.remove('valido');
            campo.classList.add('invalido');
            mensaje.textContent = "Las contraseñas no coinciden.";
            mensaje.style.display = "block";
        }
    }

    // Comprobar si tyodos los campos son válidos para habilitar el botón de guardar
    let todosValidos = true;
    inputs.forEach((input) => {
        if (!input.classList.contains('valido')) {
            todosValidos = false;
        }
    });
    btnGuardar.disabled = !todosValidos;
}

// Guardar datos con localStorage
function guardarDatos() {
    const datos = {};
    inputs.forEach((input) => {
        datos[input.name] = input.value;
    });
    localStorage.setItem('datosFormulario', JSON.stringify(datos));
    infoMsg.textContent = "Datos guardados correctamente!";
    infoMsg.classList.remove('oculto');
    setTimeout(() => {
        infoMsg.classList.add('oculto');
    }, 3000);
}

// Recuperar datos de localStorage
function recuperarDatos() {
    const datos = JSON.parse(localStorage.getItem('datosFormulario'));
    if (datos) {
        inputs.forEach((input) => {
            if (datos[input.name]) {
                input.value = datos[input.name];
                validate(input, patterns[input.name]);
            }
        });
        infoMsg.textContent = "Datos recuperados correctamente!";
        
    } else {
        infoMsg.textContent = "Datos guardados correctamente!";
    }
    infoMsg.classList.remove('oculto');
        setTimeout(() => {
            infoMsg.classList.add('oculto');
        }, 3000);
}

btnGuardar.addEventListener('click', guardarDatos);
btnRecuperar.addEventListener('click', recuperarDatos);
