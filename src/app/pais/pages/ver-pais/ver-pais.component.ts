import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
})
export class VerPaisComponent implements OnInit {
  respPais!: Country; //cuando una propiedad no se inicializa por defecto es null entonces
  //al ponerle ! significa que le informamos a TS que nos permita hacer un pais y que puede ser null apesar te ser un country

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {} // inyeccion de un modulo router

  ngOnInit(): void {
    this.activatedRoute.params // tenemos acceso al "activatedRout" observable y accedemos al url especificamente a los parametros(/CR)

      .pipe(
        // el pipe solo es para agregar el numero que queramos de operadores que van a trabajar con el producto de params
        //estoy recibiendo el url "pais/MX" ESPECIFICAMENTE "MX"=parametro
        // el switchMap me permite recibir ese observable "param" y devolver otro observable como el getPaisPorAlpha y a ese servicio le mandamos el "MX" para que nos haga la peticion http
        //Basicamente el switch en ves de mandar el primero manda el otro observable
        switchMap((param) => this.paisService.getPaisPorAlpha(param.id)),
        tap(console.log) // este opeador es para hacer un evento secuntario, al pasar por este punto imprimira lo que nos indica arriba osea el pais
      )

      //este subscribe esta suscrito al getPaisPorAlpha y a su resultado
      .subscribe((respPais) => (this.respPais = respPais));

    //activateRoutetiene todo lo necesario para suscribirnos a cualquier cambio del url
    //el "activateRoute" es para usar la propiedad que acabamos de inyectar
    //paramas: Un observable de los parámetros de la matriz dentro del alcance de esta ruta.
    // this.activatedRoute.params; //el params accede directamente al URL y identifica cual es el id que nosotros le asignamos en el app-routing
    // esta  ({desestructuracion}) esta es una desestructuracion de la informacion
    // .subscribe(({ id }) => {
    //   // subscribe me estoy suscribiendo a cualquier cambio en el url
    //   //Por lo cual si se modifica hara el siguiente proceso
    //   //1 imprimira el id que pusimos
    //   //2 usara el metodo "getPaisPorAlpha" que inyectamos del servicio paisService
    //   consoe.log(id);
    //   this.paisService
    //     .getPaisPorAlpha(id) //
    //     .subscribe((pais) => {
    //       console.log(pais);
    //     });
    // });
    //el codigo anterior era un metodo diferente pero mas dificil
  }
}
