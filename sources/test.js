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
    this.masocadajugador(cartasparuser, player);
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

  masocadajugador(masocartas, player) {
    if (player === 'cpu') {
      masocartas.forEach((cartas) => {
        cartascpu.push(cartas);
      });
    } else {
      masocartas.forEach((cartas) => {
        cartashumano.push(cartas);
      });
    }
  }
}

let cpu = new Cartas().tomarcarta(3, "cpu");
let player = new Cartas().tomarcarta(3, "houdini");

document.getElementById("tomar").addEventListener("click", () => {
  player = new Cartas().tomarcarta(1, "houdini");

  console.log(cartashumano);
});
