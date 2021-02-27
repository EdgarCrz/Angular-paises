import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
})
export class PaisInputComponent implements OnInit {
  //Ojo el primer EventE.. Es el tipado
  // output emite evetos de un hijo a un padre en este caso la propiedad se llama "onEnter" de tipo EventEmitter
  @Output() onEnter: EventEmitter<string> = new EventEmitter();

  //creo otra propiedad que enviara a su padre un eventemitter de tipo string
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  @Input() placeholder: string = '';

  //el objetico de "debouncer" es que al dejar de escribir se emita
  debouncer: Subject<string> = new Subject();

  termino: string = '';

  //ngOnInit solo se dispara una sola vez cuando el componente es creado
  ngOnInit() {
    this.debouncer.pipe(debounceTime(300)).subscribe((valor) => {
      //El rebote es el retraso de la ejecución de una función / método o una acción durante un período del tiempo especificado . Durante este tiempo especificado , las llamadas al método / función o acción se recopilan y ejecutan cada una cuando ha transcurrido el tiempo especificado.
      this.onDebounce.emit(valor);
    });
  }

  buscar() {
    //aqui se ejecutamos onEnter y hace  lo declarado arriba
    //emitimos el evento al padre y solo le mandamos como parametro "termino"
    this.onEnter.emit(this.termino);
  }

  //en el input ejecutamos este otro metodo que recibe un evento

  //debouncer es de tipo observable
  //el debouncer se va a emitir cuando deje de escribir
  teclaPresionada() {
    this.debouncer.next(this.termino);
  }
}
