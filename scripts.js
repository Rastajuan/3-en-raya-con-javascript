const celdas = document.getElementsByClassName("celda");
console.table(celdas);
let turno = 1;
let juegoTerminado = false;

// Combinaciones ganadoras
const combinacionesGanadoras = [
  [0, 1, 2],[3, 4, 5],[6, 7, 8], // Filas
  [0, 3, 6],[1, 4, 7],[2, 5, 8], // Columnas
  [0, 4, 8],[2, 4, 6], // Diagonales
];

// Comprobar si hay ganador
const comprobarGanador = () => {
  for (let combinacion of combinacionesGanadoras) {
    const [a, b, c] = combinacion;
    const contenidoA = celdas[a].textContent;
    const contenidoB = celdas[b].textContent;
    const contenidoC = celdas[c].textContent;

    if (
      contenidoA === contenidoB &&
      contenidoB === contenidoC &&
      contenidoA !== ""
    ) {
      juegoTerminado = true;
      setTimeout(() => {
        alert(`Ganó ${contenidoA}`);
      }, 0);
      return; // Terminar la función si hay un ganador
    }
  }
};

for (let i = 0; i < celdas.length; i++) {
  celdas[i].textContent = "";
  celdas[i].addEventListener("click", function () {
    if (juegoTerminado || this.textContent !== "") {
      return; // No permitir clics si el juego ha terminado o la celda ya está ocupada
    }

    this.classList.add("celda-activa");
    const contenido = turno % 2 === 0 ? "😈" : "😎";
    this.textContent = contenido;
    turno++;

    setTimeout(() => {
      comprobarGanador(); // Comprobar el ganador después de actualizar el contenido

      if (!juegoTerminado && turno > 9) {
        alert("Empate");
      }
    }, 0);
  });
}



// Reiniciar juego
const btnReiniciar = document.getElementById("reiniciar");
btnReiniciar.addEventListener("click", function () {
  for (let celda of celdas) {
    celda.textContent = "";
    celda.classList.remove("celda-activa");
  }
  turno = 1;
  juegoTerminado = false;
});
