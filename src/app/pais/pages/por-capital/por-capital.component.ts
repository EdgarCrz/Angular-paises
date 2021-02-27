import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
})
export class PorCapitalComponent {
  termino: string = '';
  hayError: boolean = false; // se crea esta propiedad type boolean con valor false
  paises: Country[] = []; // creo un arreglo vacio para llenarlo con la informacion que obtenga de la respuesta

  constructor(private PaisService: PaisService) {} // se inyecta el servico

  buscar(termino: string) {
    this.hayError = false;

    this.termino = termino;

    this.PaisService.buscarCapital(termino)
    .subscribe(
      (respPais) => {
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

    //
    // .subscribe((respCapital) => {
    //   console.log(respCapital);
    // });
  }
}
