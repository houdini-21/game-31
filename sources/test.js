class Procesos {
  crearHtml(arrayCartas, id) {
    let result = "";
    if (id === "player") {
      arrayCartas.forEach((data) => {
        const templatecardhumano = `
        <div class="carta-mesa front-card ${data.tipo}-card">
          <div class="number-top"><p>${data.valor}</p></div>
            <i class="fal fa-${data.tipo}"></i>
          <div class="number-bottom"><p>${data.valor}</p></div>
        </div>`;
        result += templatecardhumano;
        document.getElementById("player").innerHTML = result;
      });
    } else {
      arrayCartas.forEach(() => {
        const templatecardcpu = `             
        <div class="carta-mesa back-card">
          <i class="fal fa-helmet-battle logo-card-small"></i>
        </div>`;
        result += templatecardcpu;
        document.getElementById("banquero").innerHTML = result;
      });
    }
  }
  calcularpuntos(puntos) {
    console.log(puntos);
  }
}
class Jugador {
  constructor(name, id, maso, puntos) {
    this._name = name;
    this._id = id;
    this._maso = [];
    this._puntos = puntos;
  }

  get maso() {
    return this._maso;
  }
  set maso(cartas) {
    cartas.forEach((data) => {
      this._maso.push(data);
      this.puntos = data.valor;
    });
    process.crearHtml(this.maso, this.id);
  }

  get id() {
    return this._id;
  }
  set id(uid) {
    this._id = uid;
  }

  get name() {
    return this._name;
  }
  set name(nombre) {
    this._name = nombre;
  }
  get puntos() {
    return this._puntos;
  }

  set puntos(points) {
    switch (points) {
      case "Q":
        points = 10;
        break;
      case "J":
        points = 10;
        break;
      case "K":
        points = 10;
        break;
      case "AS":
        points = this.elegirvalorAs(this.id);
        break;
    }

    this._puntos += points;
    process.calcularpuntos(this.puntos);
  }

  pedircarta(carta) {
    this.maso = carta;
  }

  elegirvalorAs(id) {
    let puntaje = 0;
    if (id === "player") {
      while (!(puntaje === 11 || puntaje === 1)) {
        let valoras = parseInt(
          prompt("sacaste un AS elije su valor solo puede ser de 1 a 11")
        );
        puntaje = valoras;
      }
    } else {
      puntaje = 11;
    }

    return puntaje;
  }
}
let process = new Procesos();

class Humano extends Jugador {
  constructor(name, id = "player", maso, puntos = 0) {
    super(name, id, maso, puntos);
  }
}

let player = new Humano("houdini", "player", "", 0);

class Cpu extends Jugador {
  constructor(name, id = "banquero", maso, puntos = 0) {
    super(name, id, maso, puntos);
    this._masoJuego = [];
  }

  bienvenida() {
    ///dice hola
    console.log("hi");
    //inicia baraja de carta
    var masoDeCartas = this.armarMasoDeCartas();
    //barajea
    this.barajarMaso(masoDeCartas);
    this._masoJuego = masoDeCartas;
    //entrega carta a jugadores
    let cartashumano = this.entregarcarta(3);
    let cartascpu = this.entregarcarta(3);
    player.maso = cartashumano;
    this.maso = cartascpu;
  }

  armarMasoDeCartas() {
    let tiposdecarta = ["diamond", "club", "spade", "heart"];
    let valoresdecartas = [2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K", "AS"];
    let maso = this._masoJuego;
    tiposdecarta.forEach((type) => {
      valoresdecartas.forEach((value) => {
        maso.push({
          tipo: type,
          valor: value,
        });
      });
    });

    return maso;
  }

  barajarMaso(maso) {
    maso.sort(function (x, z) {
      return 0.5 - Math.random();
    });
  }

  entregarcarta(cant) {
    let cartasusuarios = [];
    let masoDeCartas = this._masoJuego;
    for (let i = 0; i < cant; i++) {
      let numeroaleatorio = parseInt(Math.random() * masoDeCartas.length);
      let cartauser = masoDeCartas[numeroaleatorio];
      masoDeCartas.splice(numeroaleatorio, 1);
      cartasusuarios.push(cartauser);
    }
    return cartasusuarios;
  }
}

let cpu = new Cpu();
cpu.bienvenida();

document.getElementById("tomar").addEventListener("click", () => {
  player.pedircarta(cpu.entregarcarta(1));
});

document.getElementById("quedarse").addEventListener("click", () => {
  cpu.pedircarta(cpu.entregarcarta(1));
});
