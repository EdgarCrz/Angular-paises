import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PorPaisComponent } from './pais/pages/por-pais/por-pais.component';
import { PorRegionComponent } from './pais/pages/por-region/por-region.component';
import { PorCapitalComponent } from './pais/pages/por-capital/por-capital.component';
import { VerPaisComponent } from './pais/pages/ver-pais/ver-pais.component';

// este es un arreglo de objetos de tipo Routes que es una interfaces propia de el modulo "RouterModules"
export const routs: Routes = [
  {
    path: '', // camino: en caso de que la ruta no tenga nada se ira al componente "PorPaisComponent"
    component: PorPaisComponent,
    pathMatch: 'full', //el pathMatch verifica la url iniciando del lado izquierdo verificando las coincidencias:  Por ejemplo, '/ team / 11 / user' coincide con 'team /: id'.
  },
  {
    path: 'region',
    component: PorRegionComponent,
  },
  {
    path: 'capital',
    component: PorCapitalComponent,
  },
  {
    path: 'pais/:id',
    component: VerPaisComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routs)], // estoy importando el Modulo "RouterModule" propio de angular especificamente a su metodo yle estoy pasando lo de arriba
  exports: [RouterModule],
})
export class AppRoutingModule {}
