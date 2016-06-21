/* global diferenciaAux */

primeraVuelta = true;
numeroVueltas = 1;
diferenciaAnterior = 0;

function iniciarContador() {
    if (primeraVuelta)
        horaActual = new Date();
    horaDeInicio = new Date().getTime();
    diferencia = new Date(horaDeInicio - horaActual);
    document.getElementById("cronometro").innerHTML = "<h3>" + devolverCero(diferencia.getUTCHours()) + ":" + devolverCero(diferencia.getUTCMinutes())
            + ":" + devolverCero(diferencia.getUTCSeconds()) + ":" + devolverCero(diferencia.getUTCMilliseconds()).toString().substring(0, 2) + "</h3>";
    primeraVuelta = false;
    timeOut = setTimeout("iniciarContador()", 10);
}

function reanudarContador() {
    if (primeraVuelta)
        horaActual = new Date();
    
    horaDeInicio = new Date().getTime();
    diferencia = new Date(diferenciaAux.getTime() + (horaDeInicio - horaActual));
    document.getElementById("cronometro").innerHTML = "<h3>" + devolverCero(diferencia.getUTCHours()) + ":" + devolverCero(diferencia.getUTCMinutes())
            + ":" + devolverCero(diferencia.getUTCSeconds()) + ":" + devolverCero(diferencia.getUTCMilliseconds()).toString().substring(0, 2) + "</h3>";
    primeraVuelta = false;
    timeOut = setTimeout("reanudarContador()", 10);
}

function devolverCero(tiempo) {
    if (tiempo < 10)
        return "0" + tiempo;
    else
        return tiempo;
}

function vuelta() {
    diferenciaVuelta = new Date(diferencia - diferenciaAnterior);
    
    vueltaX = '<div class="list-group-item">'+"Vuelta " + devolverCero(numeroVueltas) 
            + " - " + devolverCero(diferenciaVuelta.getUTCHours())
            + ":" + devolverCero(diferenciaVuelta.getUTCMinutes())
            + ":" + devolverCero(diferenciaVuelta.getUTCSeconds()) 
            + ":" + devolverCero(diferenciaVuelta.getUTCMilliseconds()).toString().substring(0, 2)+'</div>';
    
    html = document.getElementById("vueltas");
    html.innerHTML = vueltaX + html.innerHTML;
    
    numeroVueltas++;
    diferenciaAnterior = diferencia.getTime();
}

function detener() {
    clearTimeout(timeOut);
    primeraVuelta = true;
    diferenciaAux = diferencia;
    cambiarReanudar();
    cambiarReiniciar();
}

function cambiarDetener() {
    document.getElementById("iniciar").innerHTML = '<button style="width: 100%; margin-bottom: 5px" type="button" class="btn btn-danger" onclick="detener()">Detener</button>';
}

function cambiarIniciar() {
    document.getElementById("iniciar").innerHTML = '<button style="width: 100%; margin-bottom: 5px" type="button" class="btn btn-success" onclick="iniciarContador(); cambiarDetener()">Iniciar</button>';
}

function cambiarReiniciar() {
    document.getElementById("vuelta").innerHTML = '<button style="width: 100%" type="button" class="btn btn-primary" onclick="cambiarIniciar(); cambiarVuelta(); reiniciar()">Reiniciar</button>';
}

function cambiarReanudar() {
    document.getElementById("iniciar").innerHTML = '<button style="width: 100%; margin-bottom: 5px" type="button" class="btn btn-success" onclick="reanudarContador(); cambiarDetener(); cambiarVuelta()">Reanudar</button>';
}

function cambiarVuelta() {
    document.getElementById("vuelta").innerHTML = '<button style="width: 100%" type="button" class="btn btn-default" onclick="vuelta()">Vuelta</button>';
}

function reiniciar() {
    document.getElementById("cronometro").innerHTML = "<h3>00:00:00:00</h3>";
    document.getElementById("vueltas").innerHTML = '<div id="vueltas"></div>';
    numeroVueltas = 1;
    diferenciaAnterior = 0;
    primeraVuelta = true;
}