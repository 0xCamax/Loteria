const boleto = [];
let boletosStorage = localStorage.getItem("boletos");
let boletosJSON = JSON.parse(boletosStorage);

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
    for (let i = 6; i > y; i--) {
        x = '0' + x;
    }
    return x;
}   

function startLotery(n){
    for (let i = 0; i < n; i++) {
        let boletos = new Boleto("", "", i);
        boleto.push(boletos);
        guardarLocal("boletos", JSON.stringify(boleto)); 
    }
}

const guardarLocal = (clave, valor) => {localStorage.setItem(clave, valor)};



function inputError(mensaje, id) {
    let idError = document.getElementById(id);
    let newId = mensaje.replace(/\s/g, "");
    let input = document.getElementById(`${newId}`);
    if (!input){
        idError.insertAdjacentHTML("afterend", `<span id=${newId}>${mensaje}</span>`);
    }
}


function modificarNombre(x, n, m) {
    debugger
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
            guardarLocal("boletos", JSON.stringify(boleto)); 
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

// funcion provisional para registrar boletos

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
            document.getElementById("nombre").value = "";
            document.getElementById("contacto").value = "";
            for (let i = 1; i <= 6; i++) {
                document.getElementById('numero' + i).value = "";
            }
        }
    }
}

let ganador = undefined;

function loteria() {
    let boletosDisponibles = boleto.filter((y) => y.nombre === "")
    if (boletosDisponibles.length > 0) {
        inputError("No se han vendido todos los boletos", "loteria");
    } else {
        let input = document.getElementById("Nosehanvendidotodoslosboletos");
        if(input){
            input.remove();
            }
        let numero = Math.ceil(Math.random() * (boleto.length));
        ganador = boleto[numero].numeroBoleto;

        //Mostrar resultados en la pagina
        const nombreGanador = nombreDelGanador();
        let boletoGanador = document.getElementById("numeroGanador");
        let amigoGanador = document.getElementById("ganador");

        boletoGanador.innerHTML= `${ganador}`;
        amigoGanador.innerHTML= `El boleto ganador es de ${nombreGanador}!!`;
    }
}


const botonLoteria = document.getElementById("loteria");
botonLoteria.addEventListener("click", loteria);


//Obtener el nombre del ganador en base al numero ganador

function nombreDelGanador(){
    const nombreGanador = boleto.find(boleto => boleto.numeroBoleto === ganador);    
    return nombreGanador.nombre;
}

startLotery(10);
console.log(boleto);
console.log(typeof boletosJSON);


