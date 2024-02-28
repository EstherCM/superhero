import { Component } from '@angular/core';

import { SuperheroRepository } from '../../../2_domain/repositories/superhero.service';
import { ISuperhero } from '../../../2_domain/models/superhero-display';

@Component({
  selector: 'app-superheros-list',
  templateUrl: './superheros-list.component.html',
  styleUrls: [
    '../../../../styles/superhero-list.scss',
    '../../../../styles/superhero-item.scss',
  ],
})
export class SuperherosListComponent {
  public superheros: ISuperhero[] = [];

  constructor(private superheroRepository: SuperheroRepository) {}

  ngOnInit() {
    return this.superheroRepository.get().subscribe({
      next: (superheros: ISuperhero[]) => (this.superheros = superheros),
      error: (error) => console.error('🔥 Error getting superheros:', error),
    });
  }
}
