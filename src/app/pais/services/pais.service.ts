import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiUrl: string = 'https://restcountries.eu/rest/v2'; // esta es la url base que nos proporciona la api

  //creamos esta propiedad para poder llamarla en los methodos
  // el "httpParams solo es el nombre de la propiedad"
  // el "HttpParams().set()" es el importado  del modulo http

  get httpParams() {
    //get: Enlaza la propiedad de un objeto con una función que será llamada cuando la propiedad es buscada.
    return new HttpParams().set(
      'fields',
      'name;capital;alpha2Code;flag;population'
    );
  }

  constructor(private http: HttpClient) {} //estoy inyectando esta clase propia de Angular para poder usar sus propiedades ymetodos
  // buscar pais es un metodo que recibe "termino" tipo string y devuelve un observable

  //Estoy creando un servicio para poder usarlo en mis diferentes componentes po-pais,por-capital...
  //Esta rcibiendo un "termino" y es de tipado observable
  buscarPais(termino: string): Observable<Country[]> {
    //creamos una variable "url" y con backtics  para poder incrustarle las propiedades ue queremos
    //le incrustamos la base "apiUrl" y  y le incrustamos el  termino que es el que nos estan pasando como parametro
    const url = `${this.apiUrl}/name/${termino}`;
    return this.http.get<Country[]>(url, { params: this.httpParams }); //esta funcion  retornara la url ya armada sea donde se este ocupando este servicio
  }

  buscarCapital(termino: string): Observable<Country[]> {
    //creamos una variable "url" y con backtics  para poder incrustarle las propiedades ue queremos
    //le incrustamos la base "apiUrl" y  y le incrustamos el  termino que es el que nos estan pasando como parametro
    const url = `${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url, { params: this.httpParams }); //esta funcion  retornara la url ya armada sea donde se este ocupando este servicio
  }

  // este metodo recibe un parametro id de tipo string y devuelve un observable que a su vez es de tipo un pais
  getPaisPorAlpha(id: string): Observable<Country> {
    const url = `${this.apiUrl}/alpha/${id}`; // construimos la url con el apiUrl + elpha + el id que nos mandaron
    return this.http.get<Country>(url); // retornamosla peticion http del valor de la url
    //estoy retornando un observable  de tipo country "pais"
    // El método HTTP GET solicita una representación del recurso especificado. Las solicitudes que usan GET solo deben usarse para recuperar datos (no deben incluir datos)
  }
  getPaisPorRegion(terminoRegion: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${terminoRegion}`; // construimos la url con el apiUrl + region + el terminoRegion que nos mandaron
    return this.http.get<Country[]>(url, { params: this.httpParams }); // retornamosla peticion http del valor de la url
    //estoy retornando un observable  de tipo country "pais"
    // El método HTTP GET solicita una representación del recurso especificado. Las solicitudes que usan GET solo deben usarse para recuperar datos (no deben incluir datos)
  }
}
