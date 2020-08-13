let masobarajeado = false;
let masoDeCartas;
let cartashumano = [];
let cartascpu = [];
let puntoshumano = 0;
let puntoscpu = 0;

class Marcador {
  calcularpuntos(puntos, player) {
    if (puntos === "J" || puntos === "Q" || puntos === "K") {
      puntos = 10;
    }
    if (player === "cpu") {
      puntoscpu += puntos;
      console.log("cpu", puntoscpu);
    } else {
      if (puntos === "AS") {
        let valoras = parseInt(prompt("sacaste la carta AS elige su valor"));
        puntoshumano += valoras;
      } else {
        puntoshumano += puntos;
      }
      console.log("humanos", puntoshumano);
    }
  }

  detectarganador() {}

  reiniciarmarcador() {
    puntoshumano = 0;
    puntoscpu = 0;
  }
}

let marcador = new Marcador();

class Ui {
  generarTemplatedeCartas(cartasarray, playeruid) {
    let result = "";
    if (playeruid === "cpu") {
      cartasarray.forEach((data) => {
        const templatecardcpu = `             
        <div class="carta-mesa back-card">
          <i class="fal fa-helmet-battle logo-card-small"></i>
        </div>`;
        result += templatecardcpu;
        marcador.calcularpuntos(data.valor, playeruid);
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
        marcador.calcularpuntos(data.valor, playeruid);
        document.getElementById("player").innerHTML = result;
      });
    }
    marcador.reiniciarmarcador();
  }
}

let claseui = new Ui();

class Cartas {
  constructor() {
    this._maso = [];
  }

  //si jugador necesita carta la pide
  //se escoge al ganador segun cercanda al 31 o si es igual al 31
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
    let cartasparuser = [];
    let arraycartasplayers;
    for (let i = 0; i < ncartasentregar; i++) {
      let numeroaleatorio = parseInt(Math.random() * masoDeCartas.length);
      let cartauser = masoDeCartas[numeroaleatorio];
      cartasparuser.push(cartauser);
      masoDeCartas.splice(numeroaleatorio, 1);
    }
    cartasparuser.forEach((cartas) => {
      player === "cpu"
        ? (cartascpu.push(cartas), (arraycartasplayers = cartascpu))
        : (cartashumano.push(cartas), (arraycartasplayers = cartashumano));
    });
    claseui.generarTemplatedeCartas(arraycartasplayers, player);
  }

  //ui
  //generartemplate
  //generarmodal
}

let claseCartas = new Cartas();
claseCartas.inicioPartida();

class Jugador {
  pedirCarta(ncartasentregar, player) {
    claseCartas.tomarCartadeMaso(ncartasentregar, player);
  }

  nopedirCarta() {}

  elegirValorAs() {}
}

class Cpu extends Jugador {
  constructor() {
    super();
  }
}

let clasejugador = new Jugador();
document.getElementById("tomar").addEventListener("click", () => {
  clasejugador.pedirCarta(1, "houdini");
});
