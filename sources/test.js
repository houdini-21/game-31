let masobarajeado = false;
let masoDeCartas;
let cartashumano = [];
let cartascpu = [];
let puntoshumano = 0;
let puntoscpu = 0;

class Ui {
  generarTemplatedeCartas(cartasarray, playeruid) {
    let result = "";
    if (playeruid === "cpu") {
      cartasarray.forEach(() => {
        const templatecardcpu = `             
        <div class="carta-mesa back-card">
          <i class="fal fa-helmet-battle logo-card-small"></i>
        </div>`;
        result += templatecardcpu;
        document.getElementById("banquero").innerHTML = result;
      });
    } else {
      cartasarray.forEach((data) => {
        const templatecardhumano = `
        <div class="carta-mesa front-card ${data.tipo}-card">
          <div class="number-top"><p>${data.valor}</p></div>
            <i class="fal fa-${data.tipo}"></i>
          <div class="number-bottom"><p>${data.valor}</p></div>
        </div>`;
        result += templatecardhumano;
        document.getElementById("player").innerHTML = result;
      });
    }
  }
}

class Marcador {
  calcularpuntos(puntos, player) {
    let puntajegeneral = puntos[puntos.length - 1].valor;
    switch (puntajegeneral) {
      case "Q":
        puntajegeneral = 10;
        break;
      case "J":
        puntajegeneral = 10;
        break;
      case "K":
        puntajegeneral = 10;
        break;
      case "AS":
        if (player === "cpu") {
          puntajegeneral = 11;
        } else {
          while (!(puntajegeneral === 11 || puntajegeneral === 1)) {
            let valoras = parseInt(
              prompt("sacaste un AS elije su valor solo puede ser de 1 a 11")
            );
            puntajegeneral = valoras;
          }
        }
        break;
    }
    player === "cpu" ?
      (puntoscpu += puntajegeneral) :
      (puntoshumano += puntajegeneral);
  }

  detectarganador() {}
}
/**
 *   -Ya suma correctamente los puntajes incluyendo el AS, cree el modal y programe solo falta agregar la logica 
 * tambien estuve buscando una forma de ver que puntaje esta mas cercano a 31 y encontre algo sobre una busqueda binaria
 * pero no entiendo si esa es la manera correcta o hay otras
 *
 *   -gestionar los turnos aun no puedo hacer que el banquero "tome una carta" segun le comvenga
 *
 *   -trabajar la parte de turnos y agregar la logica al modal para que reconozca el valor de as
 * tambien crear la pantalla que muestra quien es el ganador y con cuantos puntos
 *
 */

let claseui = new Ui();
let marcador = new Marcador();

class Cartas {
  constructor() {
    this._maso = [];
  }

  armarMasoDeCartas() {
    let tiposdecarta = ["diamond", "club", "spade", "heart"];
    let valoresdecartas = [2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K", "AS"];
    let maso = this._maso;
    tiposdecarta.forEach((type) => {
      valoresdecartas.forEach((value) => {
        maso.push({
          tipo: type,
          valor: value,
        });
      });
    });

    masobarajeado = true;
    return maso;
  }

  barajarMaso(maso) {
    maso.sort((x, z) => {
      return 0.5 - Math.random();
    });
  }

  tomarCartadeMaso(ncartasentregar, player) {
    let arraycartasplayers;
    for (let i = 0; i < ncartasentregar; i++) {
      let numeroaleatorio = parseInt(Math.random() * masoDeCartas.length);
      let cartauser = masoDeCartas[numeroaleatorio];
      player === "cpu" ?
        (cartascpu.push(cartauser), (arraycartasplayers = cartascpu)) :
        (cartashumano.push(cartauser), (arraycartasplayers = cartashumano));
      marcador.calcularpuntos(arraycartasplayers, player);
      masoDeCartas.splice(numeroaleatorio, 1);
    }
    claseui.generarTemplatedeCartas(arraycartasplayers, player);
  }
}

let claseCartas = new Cartas();

const inicioPartida = () => {
  masoDeCartas = claseCartas.armarMasoDeCartas();
  claseCartas.barajarMaso(masoDeCartas);
  claseCartas.tomarCartadeMaso(3, "cpu");
  claseCartas.tomarCartadeMaso(3, "humano");
};

class Jugador {
  pedirCarta(ncartasentregar, player) {
    claseCartas.tomarCartadeMaso(ncartasentregar, player);
  }

  //elegir valor AS

  //No pedir carta
}

class Cpu extends Jugador {
  constructor() {
    super();
  }
  //da bienvenida
  //barajea cartas
  //entrega cartas
  //pregunta su quiere carta
  //sino termina el juego
}

class Humano extends Jugador {
  constructor() {
    super();
  }
}

document.getElementById("tomar").addEventListener("click", () => {
  new Humano().pedirCarta(1, "humano");
});

inicioPartida();

//Class cartas llamara a procesos
//procesos llama a player
//player llama a cartas
//
//
//
//
//si se pasa pierde,
//si tiene 31 gana sino
//comparar los dos puntajes solo si son menores a 31 y verifica quien tiene mayor puntaje
