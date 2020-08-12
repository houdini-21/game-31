let masobarajeado = false;
let masoDeCartas;
let cartashumano = [];
let cartascpu = [];

class Cartas {
  constructor() {
    this._maso = [];
  }

  tomarcarta(ncartasentregar, player) {
    let cartasparuser = [];

    if (!masobarajeado) {
      masoDeCartas = this.armarMasoDeCartas();
      this.barajarMaso(masoDeCartas);
    }

    for (let i = 0; i < ncartasentregar; i++) {
      let cardAleatoria = parseInt(Math.random() * masoDeCartas.length);
      let cartauser = masoDeCartas[cardAleatoria];
      cartasparuser.push(cartauser);
      masoDeCartas.splice(cardAleatoria, 1);
    }
    this.entregarCartaJugador(cartasparuser, player);
  }

  armarMasoDeCartas() {
    let tipodecarta = ["diamond", "club", "spade", "heart"];
    let valordecartas = [2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K", "AS"];
    let maso = this._maso;
    tipodecarta.forEach((type) => {
      valordecartas.forEach((value) => {
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

  entregarCartaJugador(masocartas, player) {
    if (player === "cpu") {
      masocartas.forEach((cartas) => {
        cartascpu.push(cartas);
        this.generarTemplatedeCartas(cartascpu, player);
      });
    } else {
      masocartas.forEach((cartas) => {
        cartashumano.push(cartas);
        this.generarTemplatedeCartas(cartashumano, player);
      });
    }
  }
  
  generarTemplatedeCartas(cartasarray, playeruid) {
    let result = "";
    if (playeruid === "cpu") {
      cartasarray.forEach(() => {
        const carta = `             
        <div class="carta-mesa back-card">
          <i class="fal fa-helmet-battle logo-card-small"></i>
        </div>`;
        result += carta;
        document.getElementById("banquero").innerHTML = result;
      });
    } else {
      cartasarray.forEach((data) => {
        const template = `
        <div class="carta-mesa front-card ${data.tipo}-card">
          <div class="number-top"><p>${data.valor}</p></div>
            <i class="fal fa-${data.tipo}"></i>
          <div class="number-bottom"><p>${data.valor}</p></div>
        </div>`;
        result += template;
        document.getElementById("player").innerHTML = result;
      });
    }
  }
}

let cpu = new Cartas().tomarcarta(3, "cpu");
let player = new Cartas().tomarcarta(3, "houdini");

document.getElementById("tomar").addEventListener("click", () => {
  player = new Cartas().tomarcarta(1, "houdini");
  cpu = new Cartas().tomarcarta(1, "cpu");
});
