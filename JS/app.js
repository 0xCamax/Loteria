// Simulador de lotería 

class boleto {
    static numero = 1;
    constructor(Nombre, Contacto) {
        this.nombre = Nombre;
        this.contacto = Contacto;
        this.numero = boleto.numero++;
    }
}

alert("Agrega Nombre y contacto de los participantes de la rifa");

// Agregar los participantes de la rifa

const boletos = [];


for (let i = 0; i < 5; i++) {
    let nombre = null;
    let contacto = null;

    if (nombre === "" || nombre === null) {
        nombre = prompt("Ingrese el nombre");
        if (nombre === "" || nombre === null) {
            alert("Por favor, ingrese un nombre.");
        }
    }

    if (contacto === "" || contacto === null) {
        contacto = prompt("Ingrese el contacto");
        if (contacto === "" || contacto === null) {
            alert("Por favor, ingrese un contacto.");
        }
    }

    boletos.push(new boleto(nombre, contacto));

    nombre = null;
    contacto = null;
}

console.log(boletos);

// Registrar los prompts en la pagina

let boletosVendidos = document.getElementById("tablaboletos");

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


// Obtener un numero al azar para elegir al ganador

function loteria() {
    let numero = Math.ceil(Math.random() * (boleto.numero - 1));
    return numero;
}

let ganador = loteria();

//Obtener el nombre del ganador en base al numero ganador

function nombreDelGanador(){
    const nombreGanador = boletos.find(boleto => boleto.numero === ganador);
        
    return nombreGanador ? nombreGanador.nombre: null;
}

const nombreGanador = nombreDelGanador();

//Mostrar resultados en la pagina

let boletoGanador = document.getElementById("numeroGanador");
let amigoGanador = document.getElementById("ganador");

boletoGanador.innerHTML= `${ganador}`;
amigoGanador.innerHTML= `El boleto ganador es de ${nombreGanador}!!`;

alert(`El ganador es ${nombreGanador}`);