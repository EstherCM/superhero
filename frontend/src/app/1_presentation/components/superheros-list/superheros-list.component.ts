import { Component } from '@angular/core';

import { SuperheroRepository } from '../../../2_domain/repositories/superhero.service';
import { ISuperhero } from '../../../2_domain/models/superhero-display';
import { SuperheroService } from '../../services/superhero.service';

@Component({
  selector: 'sh-list',
  templateUrl: './superheros-list.component.html',
  styleUrls: [
    '../../../../styles/superhero-list.scss',
    '../../../../styles/superhero-item.scss',
  ],
})
export class SuperherosListComponent {
  public superheros: ISuperhero[] = [];

  constructor(
    private superheroRepository: SuperheroRepository,
    private superheroService: SuperheroService
  ) {}

  ngOnInit() {
    const filters = {
      name: '',
    };

    this.superheroService.superheros$.subscribe((value) => {
      this.superheros = value;
    });

    return this.superheroRepository.get(filters).subscribe({
      next: (superheros: ISuperhero[]) => (this.superheros = superheros),
      error: (error) => console.error('🔥 Error getting superheros:', error),
    });
  }
}
