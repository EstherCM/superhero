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

  get(filters: { name: string }): Observable<Partial<ISuperhero>[]> {
    return this.superheroAdapter.get(filters).pipe(
      map((superheros) => {
        return superheros.map((superhero) => ({
          id: superhero.id,
          name: superhero.name,
          image: superhero.images.md,
        }));
      })
    );
  }

  getById(id: string | null): Observable<ISuperhero> {
    return this.superheroAdapter.getById(id).pipe(
      map((superhero) => {
        const relatives = superhero.connections.relatives.split(';');
        return {
          id: superhero.id,
          name: superhero.name,
          image: superhero.images.md,
          appearance: {
            eyeColor: superhero.appearance.eyeColor,
            gender: superhero.appearance.gender,
            hairColor: superhero.appearance.hairColor,
            height: superhero.appearance.height[1],
            race: superhero.appearance.race,
            weight: superhero.appearance.weight[1]
          },
          biography: {
            fullName: superhero.biography.fullName,
            placeOfBirth: superhero.biography.placeOfBirth
          },
          connections: {
            relatives
          },
          powerstats: {
            combat: superhero.powerstats.combat,
            durability: superhero.powerstats.durability,
            intelligence: superhero.powerstats.intelligence,
            power: superhero.powerstats.power,
            speed: superhero.powerstats.speed,
            strength: superhero.powerstats.strength
          },
          work: superhero.work.occupation
        }
      })
    );
  }
}
