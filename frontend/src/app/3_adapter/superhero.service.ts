import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

import { IDBSuperhero } from '../2_domain/models/superhero-db';

@Injectable({
  providedIn: 'root',
})
export class SuperheroAdapter {
  private baseURL = 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api';

  constructor(private http: HttpClient) {}

  /**
   * El filtro debería hacerse desde el backend con queryParams
   * pero ahora estoy mockeando ese filtro para hacerlo desde el lado del cliente
   */

  get(params: { name: string }): Observable<IDBSuperhero[]> {
    const url = `${this.baseURL}/all.json`;
    const storedAllResponseString = localStorage.getItem('allResponse');

    if (storedAllResponseString) {
      const storedResponse = JSON.parse(storedAllResponseString);

      const response$ = of(storedResponse);

      return response$.pipe(
        map((superheros) => {
          if (params.name === '') {
            return superheros;
          }
          return superheros.filter((superhero: IDBSuperhero) => superhero.name === params.name);
        })
      );
    } else {
      return this.http.get<IDBSuperhero[]>(url).pipe(
        map((superheros) => {
          localStorage.setItem('allResponse', JSON.stringify(superheros));
          return superheros;
        })
      );
    }
  }

  getById(id: string): Observable<IDBSuperhero> {
    const url = `${this.baseURL}/id/${id}`;

    return this.http.get<IDBSuperhero>(url);
  }

}
