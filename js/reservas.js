// Constantes
const formulario = document.getElementById("form");
const inputs = document.querySelectorAll("#form .inputs");
const boton = document.querySelector('#boton-submit')
const abrirModal = document.getElementById('boton-submit')
const modal = document.querySelector('.modal')
const parrafoModal = document.querySelector('.modal__paragraph')
const cerrarModal = document.querySelector('.modal__close')

// Variables
let emailValor = ''
let nombre = false
let apellido = false
let telefono = false
let email = false
let sucursal = false
let cantidad = false
let fecha = false


// Expresiones regulares
const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

// Determinar el mínimo y el máximo del input fecha
const input_fecha = document.querySelector("#fecha")
const dia = new Date().getDate()
const mes = (new Date().getMonth()) + 1
const anio = new Date().getFullYear()
if (mes < 10) {
  input_fecha.setAttribute('min', `${anio}-0${mes}-${dia}`)
} else {
  input_fecha.setAttribute('min', `${anio}-${mes}-${dia}`)
}

if (mes < 10) {
  input_fecha.setAttribute('max', `${anio + 1}-0${mes}-${dia}`)
} else {
  input_fecha.setAttribute('max', `${anio + 1}-${mes}-${dia}`)
}


// Validación de formulario
const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      // Comprobar si el usuario ingresado es válido
      if (expresiones.nombre.test(e.target.value)) {
        document.getElementById("error-nombre").style = "visibility:hidden";
        nombre = true
      } else {
        document.getElementById("error-nombre").style = "visibility:visible";
        nombre = false
      }
      break;

    case "apellido":
      if (expresiones.nombre.test(e.target.value)) {
        document.getElementById("error-apellido").style = "visibility:hidden";
        apellido = true
      } else {
        document.getElementById("error-apellido").style = "visibility:visible";
        apellido = false
      }
      break;

    case "telefono":
      if (expresiones.telefono.test(e.target.value)) {
        document.getElementById("error-telefono").style = "visibility:hidden";
        telefono = true
      } else {
        document.getElementById("error-telefono").style = "visibility:visible";
        telefono = false
      }
      break;

    case "email":
      if (expresiones.correo.test(e.target.value)) {
        document.getElementById("error-email").style = "visibility:hidden";
        email = true
        emailValor = e.target.value
      } else {
        document.getElementById("error-email").style = "visibility:visible";
        email = false
      }
      break;

    case "sucursal":
      if (e.target.value != "") {
        document.getElementById("error-sucursal").style = "visibility:hidden";
        sucursal = true
      } else {
        document.getElementById("error-sucursal").style = "visibility:visible";
        sucursal = false
      }
      break;

    case "cantidad":
      if (e.target.value != "") {
        document.getElementById("error-cant").style = "visibility:hidden";
        cantidad = true
      } else {
        document.getElementById("error-cant").style = "visibility:visible";
        cantidad = false
      }
      break;

    case "fecha":
      if (e.target.value) {
        document.getElementById("error-cant").style = "visibility:hidden";
        fecha = true
      } else {
        document.getElementById("error-cant").style = "visibility:visible";
        fecha = false
      }
      break;

    default:
      break;
  }

  if (apellido && nombre && email && telefono && sucursal && cantidad && fecha) {
    boton.disabled = false
  } else {
    boton.disabled = true
  }
};



// Event listeners
inputs.forEach((input) => {
  input.addEventListener("blur", validarFormulario);
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("change", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault()
  modal.classList.add('modal--show')
  parrafoModal.textContent = `Podes ver la información de tu reserva en el mail ${emailValor}`
});

cerrarModal.addEventListener('click', (e) => {
  e.preventDefault()
  modal.classList.remove('modal--show')
})
