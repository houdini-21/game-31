let masobarajeado = false;
let masoDeCartas;
class Cartas {
  constructor() {
    this._maso = [];
  }

  tomarcarta(ncartasentregar) {
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
    return cartasparuser;
  }

  armarMasoDeCartas() {
    let tipodecarta = ["Diamantes", "Corazon", "Trebol", "Espadas"];
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
}

const cpu = new Cartas().tomarcarta(3);
const player = new Cartas().tomarcarta(3);

console.log("cartas user", player);
console.log("cartas banquero", cpu);
