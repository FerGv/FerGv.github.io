var contador = 0;
var tiempo;

function cargar_barra() {
  var barra = document.getElementById("barra");
  if (contador == 100) {contador = 0;}
  contador += 1;
  barra.style.width = contador + '%';
}

function tiempo() {
  tiempo = setInterval(cargar_barra, 100);
}
