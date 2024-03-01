import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
  @Output() superheros = new EventEmitter<Partial<ISuperhero>[]>();

  public searchSuperherosForm = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private superheroService: SuperheroService) {}

  onSubmit() {
    const formValue = this.searchSuperherosForm.value;
    const filters = {
      name: formValue.name || '',
    };

    this.superheroService.setFilter(filters);
    this.superheroService.superheros$.subscribe((superheros) => this.superheros.emit(superheros));
  }
}
