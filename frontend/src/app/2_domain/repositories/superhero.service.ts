import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SuperheroAdapter } from '../../3_adapter/superhero.service';
import { ISuperhero } from '../models/superhero-display';

@Injectable({
  providedIn: 'root',
})
export class SuperheroRepository {
  constructor(private readonly superheroAdapter: SuperheroAdapter) {}

  get(): Observable<ISuperhero[]> {
    return this.superheroAdapter.get().pipe(
      map((superheros) =>
        superheros.map((superhero) => ({
          name: superhero.name,
          image: superhero.images.md,
        }))
      )
    );
  }
}
