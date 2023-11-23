// Simulador de lotería 

class boleto {
    static numero = 1;
    constructor(Nombre, Contacto) {
        this.nombre = Nombre;
        this.contacto = Contacto;
        this.numero = boleto.numero++;
    }
}

// Agregar los participantes de la rifa

const boletos = [];

const comprarBoleto = document.getElementById("agregarBoleto");

comprarBoleto.addEventListener("click", agregarBoleto);

function agregarBoleto(){
    const nombre = document.getElementById("nombre").value;
    const contacto = document.getElementById("contacto").value;

    boletos.push(new boleto(nombre, contacto));

    document.getElementById("nombre").value = "";
    document.getElementById("contacto").value = "";

    actualizarTabla();
    console.log(boletos);
}


// Registrar los inputs en la pagina
function actualizarTabla() {
    let boletosVendidos = document.getElementById("tablaboletos");
    boletosVendidos.innerHTML = "";

        for (const boleto of boletos){
            let tr = document.createElement("tr");
            let nombre = document.createElement("td");
            let numero = document.createElement("td");
            nombre.innerHTML = boleto.nombre;
            numero.innerHTML = boleto.numero;
            tr.appendChild(nombre);
            tr.appendChild(numero);

            boletosVendidos.appendChild(tr);
        
        }
}

// Obtener un numero al azar para elegir al ganador

let ganador = undefined;

function loteria() {
    if (boletos.length === 0){
        throw new Error("Agregar boletos");
        }
        else if (boletos.length > 0) {
            let numero = Math.ceil(Math.random() * (boleto.numero - 1));
            ganador = numero;
            console.log(numero);

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
    if (ganador === undefined) { 
        throw new Error("El ganador no se a definido");
    }
    else if (ganador != undefined){
    const nombreGanador = boletos.find(boleto => boleto.numero === ganador);
        
    return nombreGanador ? nombreGanador.nombre: null;
    }
}

