class Procesos {
  constructor(idplayer, puntosplayer, puntoscpu, idcpu) {
    (this.idplayer = idplayer),
      (this.pointsplayer = puntosplayer),
      (this.idcpu = idcpu),
      (this.pointscpu = puntoscpu);
  }

  disabledbtn() {
    const btntomar = document.getElementById("tomar");
    const btnquedarse = document.getElementById("quedarse");
    btntomar.disabled = true;
    btntomar.classList.add("disable");
    btnquedarse.disabled = true;
    btnquedarse.classList.add("disable");
  }

  enabledbtn() {
    const btntomar = document.getElementById("tomar");
    const btnquedarse = document.getElementById("quedarse");
    btntomar.disabled = false;
    btntomar.classList.remove("disable");
    btnquedarse.disabled = false;
    btnquedarse.classList.remove("disable");
  }

  reiniciar() {
    const modal = document.getElementById("winner-lose-modal");
    modal.classList.add("hidden");
    const tarjetas = document.getElementById("banquero");
    tarjetas.classList.remove("flip-carta");
    this.pointscpu = "?";
    this.pointsplayer = 0;
    this.enabledbtn();
    this.mostrarpuntoscpu();
    this.actualizarpuntosjugadores(this.pointsplayer, this.idplayer);
  }

  actualizarpuntosjugadores(puntos, id) {
    if (id === "player") {
      this.idplayer = id;
      this.pointsplayer = puntos;
      const divpuntos = document.getElementById("puntos-user");
      divpuntos.innerText = `Puntos ${puntos}`;
    } else {
      this.idcpu = id;
      this.pointscpu = puntos;
    }
    this.buscarganador(this.pointscpu, this.pointsplayer);
  }

  buscarganador(puntoscpu, puntosplayer) {
    if (puntosplayer === 31 || puntoscpu > 31) {
      this.modalmostrarganador(
        "win",
        "Ganaste!!!",
        this.pointsplayer,
        this.pointscpu
      );
    } else if (puntosplayer > 31 || puntoscpu === 31) {
      this.modalmostrarganador(
        "lose",
        "Perdiste",
        this.pointsplayer,
        this.pointscpu
      );
    }
  }

  mostrarpuntoscpu() {
    let puntos = this.pointscpu;
    const divpuntos = document.getElementById("puntos-cpu");
    divpuntos.innerText = `Puntos ${puntos}`;
  }

  modalmostrarganador(img, tipo, playerpo, cpupo) {
    setTimeout(() => {
      this.revelarTarjeta();
      this.mostrarpuntoscpu();
    }, 500);

    setTimeout(() => {
      const modal = document.getElementById("winner-lose-modal");
      modal.classList.replace("hidden", "fadeIn");
      const modaltemplate = `<div class="modal-winner">
      <div class="content-winner">
        <h2 class="tittle-modal-winner-lose">${tipo}</h2>
        <div class="draw-winner-lose">
          <img class="draw-modal" src="./sources/${img}.svg" />
        </div>
        <div class="box-points">
          <h3 class="points-users">Tus puntos: ${playerpo}</h3>
          <h3 class="points-users">Puntos banquero: ${cpupo}</h3>
        </div>
        <button type="button" class="btn-reiniciar btn" id="jugarotravez">
          Volver a jugar
        </button>
      </div>
    </div>`;
      modal.innerHTML = modaltemplate;
      document.getElementById("jugarotravez").addEventListener("click", () => {
        this.reiniciar();
        resetall();
      });
    }, 2600);
  }

  crearHtmlCartas(arrayCartas, id) {
    let result = "";
    if (id === "player") {
      arrayCartas.forEach((data) => {
        const templatecardhumano = `
        <div class="carta-mesa front-card ${data.tipo}-card">
          <div class="number-top"><p>${data.valor}</p></div>
            <i class="fal fa-${data.tipo}"></i>
          <div class="number-bottom"><p>${data.valor}</p></div>
        </div>
        `;
        result += templatecardhumano;
        document.getElementById("player").innerHTML = result;
      });
    } else {
      arrayCartas.forEach((data) => {
        const templatecardcpu = `             
        <div class="carta">
          <div class="carta-mesa front-card-bank ${data.tipo}-card">
            <div class="number-top"><p>${data.valor}</p></div>
              <i class="fal fa-${data.tipo}"></i>
          <div class="number-bottom"><p>${data.valor}</p></div>
          </div>
            <div class="carta-mesa back-card-bank"></div>
        </div>`;
        result += templatecardcpu;
        document.getElementById("banquero").innerHTML = result;
      });
    }
  }

  unjugadorquedado(name, id, puntos) {
    (this.name = name), (this.id = id), (this.points = puntos);
  }

  todosquedados() {
    if (this.pointsplayer < 31 && this.pointscpu < 31) {
      if (this.pointscpu > this.pointsplayer) {
        this.modalmostrarganador(
          "lose",
          "Perdiste",
          this.pointsplayer,
          this.pointscpu
        );
      } else if (this.pointscpu === this.pointsplayer) {
        this.modalmostrarganador(
          "empate",
          "Empate",
          this.pointsplayer,
          this.pointscpu
        );
      } else if (this.pointsplayer > this.pointscpu) {
        this.modalmostrarganador(
          "win",
          "Felicidades ganaste",
          this.pointsplayer,
          this.pointscpu
        );
      }
    }
  }

  mostrarmodalvaloras() {
    setTimeout(() => {
      const modal = document.getElementById("modalAS");
      modal.classList.replace("hidden", "fadeIn");
    }, 1000);
  }

  ocultarmodalvaloras() {
    const modal = document.getElementById("modalAS");
    modal.classList.replace("fadeIn", "hidden");
  }

  revelarTarjeta() {
    const tarjetas = document.getElementById("banquero");
    tarjetas.classList.add("flip-carta");
  }
}
let processclass = new Procesos();

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
    this._maso = cartas;
  }

  entregarcartausers(cartas) {
    cartas.forEach((data) => {
      this.maso.push(data);
      this.setpuntos(data.valor);
    });
    processclass.crearHtmlCartas(this.maso, this.id);
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
    this._puntos = points;
  }

  setpuntos(points) {
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
      case "A":
        points = this.elegirvalorAs(this.id);
        break;
    }

    this.puntos += points;
    processclass.actualizarpuntosjugadores(this.puntos, this.id);
  }

  pedircarta(carta) {
    this.entregarcartausers(carta);
  }

  elegirvalorAs(id) {
    let puntaje = 0;
    if (id === "player") {
      processclass.mostrarmodalvaloras();
    } else {
      puntaje = 11;
    }
    return puntaje;
  }
}

class Humano extends Jugador {
  constructor(name, id = "player", maso, puntos = 0) {
    super(name, id, maso, puntos);
  }
  quedarse() {
    processclass.actualizarpuntosjugadores(this.puntos, this.id);
  }
}

class Cpu extends Jugador {
  constructor(name, id = "banquero", maso, puntos = 0) {
    super(name, id, maso, puntos);
    this._masocartasjuego = [];
  }

  bienvenida(player) {
    var masoDeCartas = this.armarMasoDeCartas();
    this.barajarMaso(masoDeCartas);
    this._masocartasjuego = masoDeCartas;
    let cartashumano = this.entregarcarta(3);
    let cartascpu = this.entregarcarta(3);
    player.entregarcartausers(cartashumano);
    this.entregarcartausers(cartascpu);
    processclass.enabledbtn();
  }

  armarMasoDeCartas() {
    let tiposdecarta = ["diamond", "club", "spade", "heart"];
    let valoresdecartas = [2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K", "A"];
    let maso = this._masocartasjuego;
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
    let masoDeCartas = this._masocartasjuego;
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
      if (puntos > 26 && puntos < 90) {
        processclass.todosquedados();
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
let player = new Humano("houdini", "player", "", 0);

const btniniciar = document.getElementById("iniciar");

const resetall = () => {
  cpu = new Cpu("James", "Banquero", 0);
  player = new Humano("houdini", "player", "", 0);
  processclass.reiniciar();
  document.getElementById("player").innerHTML = "";
  document.getElementById("banquero").innerHTML = "";
  btniniciar.classList.remove("hidden");
  processclass.disabledbtn();
};

document.getElementById("tomar").addEventListener("click", () => {
  player.pedircarta(cpu.sigueJugando("si"));
});
processclass.disabledbtn();
document.getElementById("quedarse").addEventListener("click", () => {
  processclass.disabledbtn();
  player.quedarse();
  cpu.sigueJugando("no");
});

const opciones = document.querySelectorAll(".btn-number-one-eleven");
opciones.forEach((btn) => {
  btn.addEventListener("click", () => {
    let opcion = parseInt(btn.id);
    player.setpuntos(opcion);
    processclass.ocultarmodalvaloras();
  });
});

btniniciar.addEventListener("click", () => {
  cpu.bienvenida(player);
  btniniciar.classList.add("hidden");
});
