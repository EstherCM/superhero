import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SuperheroRepository } from '../../../2_domain/repositories/superhero.service';
import { ISuperhero } from '../../../2_domain/models/superhero-display';
import { SuperheroService } from '../../services/superhero.service';

@Component({
  selector: 'sh-filter',
  templateUrl: './superheros-filter.component.html',
  styleUrls: [
    '../../../../styles/superhero-filter.scss',
    '../../../../styles/button.scss',
  ],
})
export class SuperherosFilterComponent {
  @Input() isOpen = false;

  public searchSuperherosForm = new FormGroup({
    name: new FormControl(''),
  });

  constructor(
    private superheroRepository: SuperheroRepository,
    private superheroService: SuperheroService
  ) {}

  onSubmit() {
    const formValue = this.searchSuperherosForm.value;

    const filters = {
      name: formValue.name || '',
    };

    this.superheroRepository.get(filters).subscribe({
      next: (superheros: ISuperhero[]) => {
        return this.superheroService.updateSuperheros(superheros);
      },
      error: (error) => console.error('🔥 Error getting superheros:', error),
    });
  }
}
