let history = false;
let yafuentregada = false;

class FactoryCard {
  CrearCarta() {
    console.log("carta creada y entregada");
  }
}

class Trebol extends FactoryCard {
  constructor() {
    //  console.log("creando carta Trebol");
    super();
    this.CrearCarta();
  }
}

class Corazon extends FactoryCard {
  constructor() {
    //console.log("Creando carta Corazon");
    super();
    this.CrearCarta();
  }
}

class Diamantes extends FactoryCard {
  constructor() {
    //  console.log("Creando carta Diamantes");
    super();
    this.CrearCarta();
  }
}

class Espadas extends FactoryCard {
  constructor() {
    //    console.log("Creando carta Espadas");
    super();
    this.CrearCarta();
  }
}

let cartagenerada;

class HistorialCartas {
  constructor(cartasgeneradas) {
    this._cartas = [];
  }

  addCartaHistorial(carta) {
    this._cartas.push(carta);
    history = true;
    console.log("agregada al historial");
    console.log(this._cartas);
  }
  verificarCartaenHistorial(cardType, valueCard) {
    let historialcartas = this._cartas;
    for (let n in historialcartas) {
      console.log("verificando haber su existe");
      if (
        historialcartas[n].tipo === cardType &&
        historialcartas[n].valor === valueCard
      ) {
        console.log(cardType, valueCard, "ya existia y esta en la posicion", n);
        yafuentregada = true;
      } else {
        yafuentregada = false;
      }
    }

    return yafuentregada;
  }
}

let historialcartas = new HistorialCartas();

class GenerarCarta {
  generarCartas(nCartas) {
    let barajadecartas = ["Diamantes" /*, "Corazon", "Trebol", "Espadas"*/];
    let valordecartas = [2, /*3, 4, 5, 6, 7, 8, 9, "J", "Q", "K", "AS"*/];

    for (let i = 0; i < nCartas; i++) {
      let numeroAleatorio = parseInt(Math.random() * barajadecartas.length);
      let tipodeCarta = barajadecartas[numeroAleatorio];
      numeroAleatorio = parseInt(Math.random() * valordecartas.length);
      let valordecarta = valordecartas[numeroAleatorio];

      let propiedadescartas = {
        tipo: tipodeCarta,
        valor: valordecarta,
      };
console.log('revisare si existe historial')
      if (history) {
        if (
          historialcartas.verificarCartaenHistorial(tipodeCarta, valordecarta)
        ) {
          this.generarCartas(1)
          console.log("nel mijo ya existe una igual");
        } else {
          historialcartas.addCartaHistorial(propiedadescartas);
          console.log("no existe ninguna igual mijo");
        }
      } else {
        console.log("no existe historial mijo");
        historialcartas.addCartaHistorial(propiedadescartas);
      }

      /*  if (history) {
        if (
          historialcartas.verificarCartaenHistorial(tipodeCarta, valordecarta)
        ) {
          console.log('si existe')
          this.generarCartas(1);
        } else {
          console.log('no existe')
          historialcartas.addCartaHistorial(propiedadescartas);
        }
      } else {
        historialcartas.addCartaHistorial(propiedadescartas);
      }

    */
    }
  }
}

new GenerarCarta().generarCartas(5);
