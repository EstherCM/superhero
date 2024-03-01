import { Injectable } from '@angular/core';
import { ISuperhero } from '../../2_domain/models/superhero-display';
import { BehaviorSubject, Observable } from 'rxjs';

import { SuperheroRepository } from '../../2_domain/repositories/superhero.service';

@Injectable({
  providedIn: 'root',
})
export class SuperheroService {
  private superherosSubject: BehaviorSubject<Partial<ISuperhero>[]> = new BehaviorSubject<Partial<ISuperhero>[]>([]);
  public superheros$: Observable<Partial<ISuperhero>[]> = this.superherosSubject.asObservable();

  private filters = {
    name: '',
  };

  constructor(private superheroRepository: SuperheroRepository) {}

  get() {
    this.superheroRepository.get(this.filters).subscribe({
      next: (superheros: Partial<ISuperhero>[]) => this.superherosSubject.next(superheros),
      error: (error) => console.error('🔥 Error getting superheros:', error),
    });
  }

  setFilter(filters: { name: string }) {
    this.filters = filters;
    this.get();
  }
}
