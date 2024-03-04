import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { SuperheroService } from '../../services/superhero.service';

@Component({
  selector: 'sh-superheros-create',
  templateUrl: './superheros-create.component.html',
  styleUrls: [
    '../../../../styles/superhero-info.scss',
    '../../../../styles/button.scss',
  ],
})
export class SuperherosCreateComponent {
  public superheroForm!: FormGroup;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private superheroService: SuperheroService,
    private router: Router
  ) {}

  ngOnInit() {
    this.superheroForm = this.fb.group({
      name: ['', Validators.required],
      img: ['', Validators.required],
      placeOfBirth: ['', Validators.required],
      work: ['', Validators.required],
      stats: this.fb.group({
        combat: [0, [Validators.required, this.percentageValidator()]],
        durability: [0, [Validators.required, this.percentageValidator()]],
        intelligence: [0, [Validators.required, this.percentageValidator()]],
        power: [0, [Validators.required, this.percentageValidator()]],
        speed: [0, [Validators.required, this.percentageValidator()]],
        strength: [0, [Validators.required, this.percentageValidator()]],
      }),
    });
  }

  public percentageValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      if (value === null || value === undefined || value < 0 || value > 100) {
        return { percentage: true };
      }

      return null;
    };
  }

  onSubmit() {
    const superheroData: {
      name: string;
      img: string;
      placeOfBirth: string;
      work: string;
      stats: {
        combat: number;
        durability: number;
        intelligence: number;
        power: number;
        speed: number;
        strength: number;
      };
    } = this.superheroForm.value;

    this.superheroService.create(superheroData);
    this.superheroService.hero$
      .pipe(takeUntil(this.destroy$))
      .subscribe((newHero) => this.router.navigate(['/superhero', newHero.id]));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
