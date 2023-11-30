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

    if (!nombre || nombre === "" || !contacto || contacto === ""){
        alert("Llena la información")
        } else {

        boletos.push(new boleto(nombre, contacto));

        document.getElementById("nombre").value = "";
        document.getElementById("contacto").value = "";

        actualizarTabla();
    }
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
    if (boletos.length <= 1){
        throw new Error("Agregar boletos");
        alert("Agregar boletos");
        }
        else if (boletos.length > 0) {
            let numero = Math.ceil(Math.random() * (boleto.numero - 1));
            ganador = numero;
            console.log("el numero ganador es " + numero);

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
    const nombreGanador = boletos.find(boleto => boleto.numero === ganador);    
    return nombreGanador.nombre;
}



const boletos2 = [];

class ejemploBoleto{
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
        const boletos = new ejemploBoleto("", null, i);
        boletos2.push(boletos);
    }
}


function modificarNombre(x, n, m) {
    for (let i = 0; i < boletos2.length; i++) {
        if (x >= boletos2.length) {
            console.log(x + " no existe");
            break;
        } else if (boletos2[i].numeroBoleto == x && boletos2[i].nombre != "") {
            console.log(x + " esta vendido")
            break;
        } else if (boletos2[i].numeroBoleto == x && boletos2[i].nombre === ""){
            boletos2[i].nombre = n;
            boletos2[i].contacto = m;
            break;
        }
    }
}

let random = document.getElementById("random");
random.addEventListener("click", getRandomBoleto)

function getRandomBoleto(){
    let disponible = boletos2.filter((y) => y.nombre === "")
    let numero = disponible[Math.ceil(Math.random() * disponible.length)].numeroBoleto;
    numero = numero.toString();
    console.log(numero)
    for (let i = 1; i <= 6; i++) {
        document.getElementById("numero" + i).value = numero.charAt(i-1);
    }
}

// funcion provisional para registrar boletos

const comprarBoletos2 = document.getElementById('agregarBoleto2');
comprarBoletos2.addEventListener("click", agregarBoleto2);

function agregarBoleto2(){
    let nombre = document.getElementById('nombre2').value;  
    let contacto = document.getElementById('contacto2').value;
    let numeros = [];
    for (let i = 1; i <= 6; i++) {
        numeros.push(document.getElementById('numero' + i).value);
    }

    if (!nombre || nombre === "" || !contacto || contacto === ""){
        alert("Llena la información")
        } else {

        let numeroBoleto = numeros.join("").trim();

        modificarNombre(numeroBoleto, nombre, contacto);

        document.getElementById("nombre2").value = "";
        document.getElementById("contacto2").value = "";
        for (let i = 1; i <= 6; i++) {
            document.getElementById('numero' + i).value = "";
        }
    }
}

startLotery(1000000);
console.log(boletos2);

