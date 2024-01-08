const boleto = [];

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
    }
}

startLotery(1000000);

const fs = require('fs');

const boletoJSON = JSON.stringify(boleto, null, 2);

fs.writeFile("boletos.json", boletoJSON, "utf8", (err) => {
    if (err){
        console.error("Error al escribir el archivo", err);
    } else {
        console.log("Archivo creado exitosamente: boletos.json")
    }
});