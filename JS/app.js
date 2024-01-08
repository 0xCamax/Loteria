const boleto = [];
const ganador = [];

class Boleto{
    constructor(nombre, contacto, numeroBoleto) {
        this.nombre = nombre;
        this.contacto = contacto;
        this.numeroBoleto = addCeros(numeroBoleto);
        this.precio = 1;
    }
}

class Ganador{
    constructor(numero) {
        this.numero = numero;
        this.fecha = (new Date).toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
}


function addCeros(x) { 
    y = x.toString().length;  
    for (let i = 6; i > y; i--) {
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

let iniciarLoteria = document.getElementById("initlotery");
iniciarLoteria.addEventListener("click", initLotery);

function initLotery() {
    let initialized = true;
}

function inputError(mensaje, id) {
    let idError = document.getElementById(id);
    let newId = mensaje.replace(/\s/g, "");
    let input = document.getElementById(`${newId}`);
    if (!input){
        idError.insertAdjacentHTML("afterend", `<span id=${newId}>${mensaje}</span>`);
    }
}


function modificarNombre(x, n, m) {
    let success = false;
    let input = document.getElementById("Noexiste");
    let input2 = document.getElementById("NoDisponible");
        if(input){
            input.remove();
        }
        if (input2){
            input2.remove();
        }
    for (let i = 0; i < boleto.length; i++) {
        if (x >= boleto.length) {
            inputError("No existe", "numero6");
            break;
        } else if (boleto[i].numeroBoleto == x && boleto[i].nombre != "") {
            inputError("No Disponible", "numero6")
            break;
        } else if (boleto[i].numeroBoleto == x && boleto[i].nombre === ""){
            boleto[i].nombre = n;
            boleto[i].contacto = m;
            success = true;
            break;
        }
    }
    return success; 
}

let random = document.getElementById("random");
random.addEventListener("click", getRandomBoleto)

function getRandomBoleto(){
    let disponible = boleto.filter((y) => y.nombre === "")
    let x = Math.ceil((Math.random() * disponible.length) - 1)
    let numero = disponible[x].numeroBoleto;
    numero = numero.toString();
    for (let i = 1; i <= 6; i++) {
        document.getElementById("numero" + i).value = numero.charAt(i-1);
    }
}

const comprarBoletos = document.getElementById('agregarBoleto');
comprarBoletos.addEventListener("click", agregarBoleto);

function agregarBoleto(){
    let nombre = document.getElementById('nombre').value;  
    let contacto = document.getElementById('contacto').value;
    let numeros = [];
    for (let i = 1; i <= 6; i++) {
        numeros.push(document.getElementById('numero' + i).value);
    }

    if (!nombre || nombre === "" || !contacto || contacto === ""){
        inputError("Llena la información", "agregarBoleto");
    } else {
        let input = document.getElementById("Llenalainformación")
        if(input){
            input.remove();
            }
        let numeroBoleto = numeros.join("").trim();

        let isValid = modificarNombre(numeroBoleto, nombre, contacto);

        if (isValid) {    
            for (let i = 1; i <= 6; i++) {
                document.getElementById('numero' + i).value = "";
            }
            Swal.fire({
                title: "Registro exitoso",
                icon: "success",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Continuar"  
            })
        }
    }
}

function loteria() {
    let random = Math.floor(Math.random() * (boleto.length));
    let numero = boleto[random - 1].numeroBoleto;
    let nuevoGanador = new Ganador(numero);
    ganador.push(nuevoGanador);
    localStorage.setItem("Historial", JSON.stringify(ganador));
    let ganadorActual = ganador[ganador.length - 1];
    let historialGanadores = JSON.parse(localStorage.getItem("Historial"));
    console.log(historialGanadores);  
    let boletoGanador = document.getElementById("historialLista");
    let boletosDisponibles = boleto.filter((y) => y.nombre === "")
    if (boletosDisponibles.length > 0) {
        Swal.fire({
            title: "No se han registrado todos los boletos",
            text: "Deseas continuar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Continuar"
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire({
            title: `El boleto ganador es ${ganadorActual.numero}!!`
            });
            actualizarHistorial();
            }
        });
    } else {
    Swal.fire({
        title: `El boleto ganador es ${ganadorActual.numero}!!`,
        });
        boletoGanador.innerHTML = `${numeroHistorial}.....${fechaHistorial}}`;
        }
}

function actualizarHistorial(){
    let historial = document.getElementById("historial");
    historial.innerHTML="";
    let historialGanadores = JSON.parse(localStorage.getItem("Historial"));
        for (const listahistorial of historialGanadores) {
            let li = document.createElement("li");
            let historialLista = document.createElement("p");
            historialLista.innerHTML=`${listahistorial.numero}................${listahistorial.fecha}`;
            li.appendChild(historialLista);

            historial.appendChild(li);
        }
}


const botonLoteria = document.getElementById("loteria");
botonLoteria.addEventListener("click", loteria);


startLotery(100);
actualizarHistorial()