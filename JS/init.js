const boleto = [];

let contador = 0

class Boleto{
    constructor(nombre, contacto, numeroBoleto) {
        this.nombre = nombre;
        this.contacto = contacto;
        this.numeroBoleto = addCeros(numeroBoleto);
        this.precio = 1;    
    }
}


function addCeros(x) { 
    y = x.toString().length;  
    for (let i = 4; i > y; i--) {
        x = '0' + x;
    }
    return x;
}


function startLotery(n){
    for (let i = 0; i < n; i++) {
        let boletos = new Boleto("", "", i);
        boleto.push(boletos);
        localStorage.setItem("boletos", JSON.stringify(boleto));
    }
}

const initLotery = () => {
    if ((localStorage.getItem("Init") === "true") || (localStorage.getItem('Init') === null) || (localStorage.getItem('Init') === undefined)) {
        Swal.fire({
            title: "Estas seguro que quieres iniciar una nueva rifa?",
            confirmButtonText: "Continuar",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("boletos");
                localStorage.removeItem("Historial");
                localStorage.setItem("Init", false);
                initLotery();
            }
        });
        
    }else{
        localStorage.setItem("Init", true)
        Swal.fire({
            title: "Cuantos boletos deseas?",
            input: "range",
            inputLabel: "Cantidad",
            allowOutsideClick: false,
            inputAttributes: {
                min: "10",
                max: "1000",
                step: "1"
            },
            inputValue: 10
        }).then((result) => {
            if (result.isConfirmed) {
                let n = Swal.getInput().value;
                if (n !== "" && !isNaN(n)) {
                    n = parseInt(n);
                    startLotery(n);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Número no válido",
                        text: "Por favor, ingresa un número válido."
                    });
                }
            }
        });
        displayRegistro();
        init(localStorage.getItem('Init'));
    }
}

function displayRegistro() {
    if (contador === 0){
        let init = localStorage.getItem("Init");
        if (init) {
            let body = document.getElementById("nuevarifa");
            body.insertAdjacentHTML("afterend", `<div class="registro" id="registro"><h2>Registrar Boleto</h2>
            <form action="">
            <div class="numeros" id="numeros">
                    <input type="number" id="numero1" min="0" max="9">
                    <input type="number" id="numero2" min="0" max="9">
                    <input type="number" id="numero3" min="0" max="9">
                    <input type="number" id="numero4" min="0" max="9">
                    <button id="random" type="button">↺</button>
                    </div>
                    
                    <label for="nombre">Nombre</label>
                    <input type="text" name="nombre" id="nombre" placeholder="Nombre del participante">
                    <label for="contacto">Contacto</label>
                    <input type="text" name="contacto" id="contacto" placeholder="Cel, redes sociales, correo o etc..">
                    <button id="agregarBoleto" type="button">Agregar Boleto</button>
                    </form></div>`);
                    let registro = document.getElementById("registro");
                    registro.insertAdjacentHTML("afterend", `<div class="loteria" id="botonloteria">
                    <button id="loteria" type="button">Lotería!</button>
                    </div>`)
                    let loteria = document.getElementById("botonloteria");
                    loteria.insertAdjacentHTML("afterend", `<div class="historial">
                    <h2>Historial</h2>
                    <ul id="historial">  
                    </ul>
                    </div>`)
        }
        contador += 1;
    }
}

let iniciarLoteria = document.getElementById("initlotery");
iniciarLoteria.addEventListener("click", initLotery);



const init = (initialized) => {
    if (contador === 1) {
        return new Promise((resolve, reject) => {
            if ("true") {
                const script = document.createElement('script');
                script.src = './JS/loteria.js';
                script.async = true;
                script.onload = () => {
                    actualizarHistorial();
                };
                script.onerror = (error) => {
                    console.error('Error al cargar loteria.js:', error);
                    reject(error);
                };
                document.head.appendChild(script);
                contador += 1;
                resolve("success");
            } else {
                reject("failure");
            }
        });
    }
    
};