//// 1) Declaración de constantes con los patrones de REGEX.

//const username=/^[a-z\d]{5,12}$/i;
//const dni=/^[x]*\d{8}[a-z]$/i


//// 2) Declaración del objeto de patrones de REGEX.

const patterns = {
    nombre: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+$/u,
    apellidos: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?$/u,
    dninie: /^(?:\d{8}[A-HJ-NP-TV-Z]|[XYZ]\d{7}[A-HJ-NP-TV-Z])$/i,
    nacimiento: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/,
    postal: /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    fijo: /^(8|9)\d{8}$/,
    movil: /^(6|7)\d{8}$/,
    iban: /^ES(?:\s?\d){22}$/i,
    credito: /^(?:4\d{12}(?:\d{3})?|5[1-5]\d{14}|3[47]\d{13}|3(?:0[0-5]|[68]\d)\d{11}|6(?:011|5\d{2})\d{12})$/,
    contrasena: /^(?=.*\d)(?=.*[^a-z0-9\s])[a-z0-9\S]{12,}$/
};


//// Declaramos la constante 'inputs' que contendrá la colección de inputs. 
const form = document.querySelector('#formulario').addEventListener('submit', (e) => {
    e.preventDefault();
});
const inputs = document.querySelectorAll('input');


//// Haciendo uso del método forEach, añadimos el evento keyup a cada uno de los inputs de la colección '(input)'.
inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        //// 1)    
        //if (e.target.name =="dni") {validate(e.target, dni)};
        //if (e.target.name =="username") {validate(e.target, username)};
        if (e.target.attributes.name.value.trim() != "") {
            validate(e.target, patterns[e.target.attributes.name.value]);
        }
    });
});


//// Declaración de la función de validación 'validate' para validar el valor del campo del formulario (variable 'campo') utilizando la expresión regular (variable 'regex').  
function validate(campo, regex) {
    // El método 'test' comprueba que el valor del campo recibido (e.target) cumple la expresión regular recibida (patterns[e.target.attributes.name.value]) como parámetros  
    if (regex.test(campo.value)) {
        campo.className = 'valido';
    } else {
        campo.className = 'invalido';
    }
}


//// https://www.w3schools.com/jsref/jsref_regexp_test.asp