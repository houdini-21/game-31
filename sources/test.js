class Procesos {
  constructor(name, id, puntos) {
    (this.name = name), (this.id = id), (this.points = puntos);
  }

  actualizapuntosuser(puntos) {
    const divpuntos = document.getElementById("puntos-user");
    divpuntos.innerText = `Puntos ${puntos}`;
  }

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

  calcularpuntos(puntos, name) {
    if (puntos === 31) {
      console.log("el ganador es", name);
    } else if (puntos > 31) {
      console.log("el Jugador", name, "pierde");
    }
  }

  unjugadorquedado(name, id, puntos) {
    (this.name = name), (this.id = id), (this.points = puntos);
  }

  todosquedados(name, id, puntos) {
    if (puntos > this.points) {
      console.log("el ganador es", name, "el", id);
    } else if (puntos === this.points) {
      console.log("empate");
    } else if (puntos < this.points) {
      console.log("el ganador es", this.name, "el", this.id);
    }
  }

  mostrarModal() {
    const modalvaloras = document.getElementById("modalAS");
    modalvaloras.classList.remove("hidden");
    const btn11 = document.getElementById("11");
    btn11.addEventListener("click", this.btnvalue);
  }

  //mostar
  btnvalue(btndata) {}
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
    process.calcularpuntos(this.puntos, this.name);
    process.actualizapuntosuser(this.puntos);
  }

  pedircarta(carta) {
    this.maso = carta;
  }

  elegirvalorAs(id) {
    let puntaje = 0;
    if (id === "player") {
      //process.mostrarModal();
      //puntaje = valorAS;
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
  quedarse() {
    process.unjugadorquedado(this.name, this.id, this.puntos);
  }
}

let player = new Humano("houdini", "player", "", 0);

class Cpu extends Jugador {
  constructor(name, id = "banquero", maso, puntos = 0) {
    super(name, id, maso, puntos);
    this._masoJuego = [];
  }

  bienvenida() {
    var masoDeCartas = this.armarMasoDeCartas();
    this.barajarMaso(masoDeCartas);
    this._masoJuego = masoDeCartas;
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

  tomarcarta() {
    let cartasbanquero = this.entregarcarta(1);
    return cartasbanquero;
  }

  sigueJugando(res) {
    let cartasUser;
    if (res === "si") {
      cartasUser = this.entregarcarta(1);
      return cartasUser;
    } else if (res === "no") {
      this.turnobanquero();
    }
  }

  turnobanquero() {
    let seguir = "si";
    while (seguir === "si") {
      let puntos = this.puntos;
      if (puntos > 26 && puntos < 31) {
        process.todosquedados(this.name, this.id, this.puntos);
        seguir = "no";
      } else if (puntos < 31) {
        this.pedircarta(this.tomarcarta());
      } else if (puntos > 31) {
        seguir = "no";
      }
    }
  }
}

let cpu = new Cpu("James", "Banquero", 0);
cpu.bienvenida();

document.getElementById("tomar").addEventListener("click", () => {
  player.pedircarta(cpu.sigueJugando("si"));
});

document.getElementById("quedarse").addEventListener("click", () => {
  player.quedarse();
  cpu.sigueJugando("no");
});
