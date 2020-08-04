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
    console.log("creando carta trebol");
    super();
    this.crearCarta();
  }
}

class Corazon extends FactoryCard {
  constructor() {
    console.log("Creando carta Corazon");
    super();
    this.crearCarta();
  }
}

class Picas extends FactoryCard {
  constructor() {
    console.log("Creando carta picas");
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
let valorcarta;
let cardAleatoria;
let tipocard = "";
let cartagenerada;
let cantidadcartasrepartidas = 3;

class generarCarta {
  generar() {
    let cartas = ["picas", "corazon", "trebol"];

    for (let i = 0; i < cantidadcartasrepartidas; i++) {
      cardAleatoria = parseInt(Math.random() * cartas.length);
      tipocard = cartas[cardAleatoria];
      valorcarta = Math.round(Math.random() * (9 - 2) + 2);
      switch (tipocard) {
        case "picas":
          cartagenerada = new Picas();
          cartagenerada.agregarvalor(valorcarta);
          break;
        case "corazon":
          cartagenerada = new Corazon();
          cartagenerada.agregarvalor(valorcarta);
          break;
        case "trebol":
          cartagenerada = new Trebol();
          cartagenerada.agregarvalor(valorcarta);
          break;
      }
    }
  }
}

new generarCarta().generar();
