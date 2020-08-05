class FactoryCard {
  crearCarta() {
    console.log("carta creada");
  }
  agregarvalor(valor) {
    console.log(`carta creada con valor ${valor}`);
  }
}

class Trebol extends FactoryCard {
  constructor() {
  //  console.log("creando carta Trebol");
    super();
    this.crearCarta();
  }
}

class Corazon extends FactoryCard {
  constructor() {
    //console.log("Creando carta Corazon");
    super();
    this.crearCarta();
  }
}

class Diamantes extends FactoryCard {
  constructor() {
  //  console.log("Creando carta Diamantes");
    super();
    this.crearCarta();
  }
}

class Espadas extends FactoryCard {
  constructor() {
//    console.log("Creando carta Espadas");
    super();
    this.crearCarta();
  }
}

class RamdomCard {
  constructor(tipocarta) {
    switch (tipocarta) {
      case "picas":
        return new Picas();
      case "corazon":
        return new Corazon();
      case "trebol":
        return new Trebol();
      default:
        return null;
    }
  }
}

let cartagenerada;

class VerificadorCartas {
  constructor(cartasgeneradas) {
    this._cartas = [];
  }

  addCartaHitorial(carta) {
    this._cartas.push(carta);
    console.log(this._cartas);
  }

  verificarCartaenHistorial(cardType, valueCard) {
    let historialcartas = this._cartas.length;
    for (let n = 0; n < historialcartas ; n++) {
      if (
        historialcartas[n].tipo.includes(cardType) &&
        historialcartas[n].valor.includes(valueCard)
      ) {
        alert("carta ya generada");
        return true;
      } else {
        return false;
      }
    }
  }
}

let verificar = new VerificadorCartas();

class GenerarCarta {
  generarCartas(nCartas) {
    let barajadecartas = ["Diamantes", "Corazon", "Trebol", "Espadas"];
    let valordecartas = [2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K", "AS"];

    for (let i = 0; i < nCartas; i++) {
      let cardAleatoria = parseInt(Math.random() * barajadecartas.length);
      let tipodeCarta = barajadecartas[cardAleatoria];
      let valorCartaAleatorio = parseInt(Math.random() * valordecartas.length);
      let valorcarta = valordecartas[valorCartaAleatorio];

      let tipoYvalorcartagenerados = {
        tipo: tipodeCarta,
        valor: valorcarta,
      };

      if (verificar.verificarCartaenHistorial(tipodeCarta, valorcarta)) {
        alert('sucias')
        console.log('sucias')
        this.generarCartas(1);
      } else {
        console.log('limpias')
        verificar.addCartaHitorial(tipoYvalorcartagenerados);

        switch (tipodeCarta) {
          case "Diamantes":
            cartagenerada = new Diamantes();
            cartagenerada.agregarvalor(valorcarta);
            break;
          case "Corazon":
            cartagenerada = new Corazon();
            cartagenerada.agregarvalor(valorcarta);
            break;
          case "Trebol":
            cartagenerada = new Trebol();
            cartagenerada.agregarvalor(valorcarta);
            break;
          case "Espadas":
            cartagenerada = new Espadas();
            cartagenerada.agregarvalor(valorcarta);
        }
      }
    }
  }
}

new GenerarCarta().generarCartas(49);
