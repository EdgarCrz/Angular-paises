import { Component } from '@angular/core';

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
      button {
        margin-right: 5px;
      }
    `,
  ],
})
export class PorRegionComponent {
  terminoRegion: string = '';
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  paises: Country[] = [];

  regionActiva: string = '';
  constructor(private PaisService: PaisService) {} // inyectamos el servicio

  // pregunto :"region" es estrictamente igual a la "regionActiva" ? si si asignale la clase  'btn btn-primary' si no 'btn btn-outline-primary'
  getClaseCss(region: string): string {
    return region === this.regionActiva
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }
  // activas region esta recibiento "region" de html
  activarRegion(region: string) {
    //validacion : si "region" es estrictamente igual a la "regionActiva" entonces no hagas nada solo regresa a esta funcion
    if (region === this.regionActiva) {
      return;
    }
    this.regionActiva = region;
    this.paises = [];

    this.terminoRegion = region;

    // me suscribo a la respuesta de "getPaisPorRegion" y de inmediato
    // 1 imprimo en consola el resultado
    // 2  el arreglo paises se llena con la respuesta del servicio "resPais"
    this.PaisService.getPaisPorRegion(region).subscribe((respPais) => {
      console.log(respPais);

      this.paises = respPais; // el arreglo "paises" se va a llenar con la respuesta que nos esta mandando el  this.PaisService.buscarPais y nos devuelve todo el objeto json ahora convertido en una interface, para asi poder acceder mas facil a los valores de la propiedad
    });
  }
}
