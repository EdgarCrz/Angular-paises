import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false; // se crea esta propiedad type boolean con valor false
  paises: Country[] = []; // creo un arreglo vacio para llenarlo con la informacion que obtenga de la respuesta
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private PaisService: PaisService) {} //se inyeccta el servicio

  //esta funcion se ejecuta del lado html gracias al ngSubmit
  //Y nos pasa el valor gracias al ngModule, por su identificador termino
  buscar(termino: string) {
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;

    this.PaisService.buscarPais(termino) //this/para referir: al servicio especificamente a su metodo "buscarPais(y le mandamos "termino")"

      //esta funcion flecha estara al pendiente de la respuesta de ese metodo
      .subscribe(
        // estoy suscrito a ala respuesta y cuando me respondan ejecutare una funcion flecha
        (respPais) => {
          //respPais es la respuesta del servicio y viene con un arreglo de los paises
          console.log(respPais); // y imprimira lo que nos devuelva buscarPais

          this.paises = respPais; // el arreglo "paises" se va a llenar con la respuesta que nos esta mandando el  this.PaisService.buscarPais y nos devuelve todo el objeto json ahora convertido en una interface, para asi poder acceder mas facil a los valores de la propiedad
        },
        //el method subscribe() puede mandar  como resultado 3 types entre ellos un tipo error
        //en el caso de que exista el error hayError cambiara de valor
        (err) => {
          this.hayError = true;
          this.paises = []; // en caso de que haya un error o no encuentre nada, el arreglo se mantendra vacio
        }
      );
  }
  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.PaisService.buscarPais(termino).subscribe(
      (paises) => (this.paisesSugeridos = paises.splice(0, 5)),
      (err) => (this.paisesSugeridos = [])
    );
  }

  buscarSugerido(termino: string) {
    this.buscar(termino);
  }
}
