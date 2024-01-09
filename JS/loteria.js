
function actualizarHistorial() {
    let historial = document.getElementById("historial");
    historial.innerHTML="";
    let historialGanadores = JSON.parse(localStorage.getItem("Historial"));
    if (Array.isArray(historialGanadores)) {
        for (const listahistorial of historialGanadores) {
                let li = document.createElement("li");
                let historialLista = document.createElement("p");
                historialLista.innerHTML=`${listahistorial.numero}................${listahistorial.fecha}`;
                li.appendChild(historialLista);
                
                historial.appendChild(li);
            }
        } else if (!historialGanadores){
                console.log("No hay historial")
        } else {
                let li = document.createElement("li");
                let historialLista = document.createElement("p");
                historialLista.innerHTML=`${historialGanadores.numero}................${historialGanadores.fecha}`;
                li.appendChild(historialLista);
                
                historial.appendChild(li);
        }
    }


const random = document.getElementById("random");
random.addEventListener("click", getRandomBoleto);
const botonLoteria = document.getElementById("loteria");
botonLoteria.addEventListener("click", loteria);
const botonRegistro = document.getElementById("agregarBoleto");
botonRegistro.addEventListener("click", agregarBoleto)


class Ganador{
    constructor(numero) {
        this.numero = numero;
        this.fecha = (new Date).toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
}

const ganador = []; 

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
            inputError("No existe", "numeros");
            break;
        } else if (boleto[i].numeroBoleto == x && boleto[i].nombre != "") {
            inputError("No Disponible", "numeros")
            break;
        } else if (boleto[i].numeroBoleto == x && boleto[i].nombre === ""){
            boleto[i].nombre = n;
            boleto[i].contacto = m;
            localStorage.setItem("boletos", JSON.stringify(boleto));
            success = true;
            break;
        }
    }
    return success; 
}



function getRandomBoleto(){
    let disponible = boleto.filter((y) => y.nombre === "")
    let x = Math.ceil((Math.random() * disponible.length) - 1)
    let numero = disponible[x].numeroBoleto;
    numero = numero.toString();
    for (let i = 1; i <= 4; i++) {
        document.getElementById("numero" + i).value = numero.charAt(i-1);
    }
}

function agregarBoleto(){
    let nombre = document.getElementById('nombre').value;  
    let contacto = document.getElementById('contacto').value;
    let numeros = [];
    for (let i = 1; i <= 4; i++) {
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
            for (let i = 1; i <= 4; i++) {
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
    let RNG = Math.floor(Math.random() * (boleto.length));
    let numero = boleto[RNG - 1].numeroBoleto;
    let nuevoGanador = new Ganador(numero);
    ganador.push(nuevoGanador);
    localStorage.setItem("Historial", JSON.stringify(ganador));
    let ganadorActual = ganador[ganador.length - 1];
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