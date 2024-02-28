import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDBSuperhero } from '../2_domain/models/superhero-db';

@Injectable({
  providedIn: 'root'
})
export class SuperheroAdapter {
  private baseURL = 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api';

  constructor(private http: HttpClient) { }

  get(): Observable<IDBSuperhero[]> {
    const url = `${this.baseURL}/all.json`;

    return this.http.get<IDBSuperhero[]>(url);
  }
}
