import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

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

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private superheroService: SuperheroService) {}

  onSubmit() {
    const formValue = this.searchSuperherosForm.value;
    const filters = {
      name: formValue.name || '',
    };

    this.superheroService.setFilter(filters);
    this.superheroService.superheros$
      .pipe(takeUntil(this.destroy$))
      .subscribe((superheros) => this.superheros.emit(superheros));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
