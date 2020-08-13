let masobarajeado = false;
let masoDeCartas;
let cartashumano = [];
let cartascpu = [];
let puntoshumano = 0;
let puntoscpu = 0;

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
        //aqui debo de preguntar por el valor a darle a 11
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
    player === "cpu"
      ? (puntoscpu += puntajegeneral)
      : (puntoshumano += puntajegeneral);
    console.log(puntoscpu, puntoshumano);
  }

  detectarganador() {}

  reiniciarmarcador() {
    puntoshumano = 0;
    puntoscpu = 0;
  }
}

//reordenamiento de codigo y dejando camino para la logica del banquero
//problemas a la hora de asignar un valor al as
//solucionar el valor de as que pregunte el valor al user y al banquero(elija segun situacion)

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

let claseui = new Ui();
let marcador = new Marcador();

class Cartas {
  constructor() {
    this._maso = [];
  }

  inicioPartida() {
    masoDeCartas = this.armarMasoDeCartas();
    this.barajarMaso(masoDeCartas);
    this.tomarCartadeMaso(3, "cpu");
    this.tomarCartadeMaso(3, "houdini");
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
      player === "cpu"
        ? (cartascpu.push(cartauser), (arraycartasplayers = cartascpu))
        : (cartashumano.push(cartauser), (arraycartasplayers = cartashumano));
      marcador.calcularpuntos(arraycartasplayers, player);
      masoDeCartas.splice(numeroaleatorio, 1);
    }
    claseui.generarTemplatedeCartas(arraycartasplayers, player);
  }
}

let claseCartas = new Cartas();
claseCartas.inicioPartida();

class Jugador {
  pedirCarta(ncartasentregar, player) {
    claseCartas.tomarCartadeMaso(ncartasentregar, player);
  }
}

class Cpu extends Jugador {
  constructor() {
    super();
  }
  //pedir carta
}

document.getElementById("tomar").addEventListener("click", () => {
  new Jugador().pedirCarta(1, "houdini");
});
