function cargar_barra() {
  var barra = document.getElementById("barra");
  if (barra.value == 100) {barra.value = 0;}
  barra.value += 1;
}

var tiempo;
function tiempo() {
  tiempo = setInterval(cargar_barra, 100);
}
