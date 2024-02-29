import { Injectable } from '@angular/core';
import { ISuperhero } from '../../2_domain/models/superhero-display';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {
  private superherosSubject: BehaviorSubject<ISuperhero[]> = new BehaviorSubject<ISuperhero[]>([]);
  public superheros$: Observable<ISuperhero[]> = this.superherosSubject.asObservable();

  constructor() { }

  updateSuperheros(value: ISuperhero[]) {
    this.superherosSubject.next(value);
  }
}
