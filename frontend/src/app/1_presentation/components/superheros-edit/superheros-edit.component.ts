import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ISuperhero } from '../../../2_domain/models/superhero-display';
import { SuperheroService } from '../../services/superhero.service';

@Component({
  selector: 'sp-edit',
  templateUrl: './superheros-edit.component.html',
  styleUrls: [
    '../../../../styles/superhero-info.scss',
    '../../../../styles/button.scss',
  ],
})
export class SuperherosEditComponent {
  public heroId: string | null = '';
  public hero!: ISuperhero;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private superheroService: SuperheroService,
    private router: Router
  ) {}

  ngOnInit() {
    this.heroId = this.route.snapshot.paramMap.get('id');

    this.superheroService
      .getById(this.heroId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((superhero) => (this.hero = superhero));
    this.superheroService.hero$.subscribe(
      (superhero) => (this.hero = superhero)
    );
  }

  onSaveChanges() {
    this.superheroService
      .update(this.heroId || '', this.hero)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigate(['/superhero', this.heroId]));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
