import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Chart from 'chart.js/auto';
import { Subject, takeUntil } from 'rxjs';

import { ISuperhero } from '../../../2_domain/models/superhero-display';
import { SuperheroService } from '../../services/superhero.service';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';

@Component({
  selector: 'sp-detail',
  templateUrl: './superheros-detail.component.html',
  styleUrls: ['../../../../styles/superhero-info.scss'],
})
export class SuperherosDetailComponent {
  @ViewChild('stats') statsRef!: ElementRef;

  public heroId: string | null = '';
  public hero!: ISuperhero | null;
  public deleteDialog = '¿Estás seguro de eliminar a este superhéroe?';

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private superheroService: SuperheroService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  ngAfterViewInit() {
    const ctx = this.statsRef.nativeElement.getContext('2d');
    const labels = Object.keys(this.hero!.powerstats);
    const data = Object.values(this.hero!.powerstats);

    new Chart.Chart(ctx, {
      type: 'radar',
      data: {
        labels,
        datasets: [
          {
            label: 'Estadísticas',
            data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }

  ngOnInit() {
    this.heroId = this.route.snapshot.paramMap.get('id');

    this.superheroService
      .getById(this.heroId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((initialSuperhero) => (this.hero = initialSuperhero));

    this.confirmationDialogService
      .getConfirmResponse()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const id = this.route.snapshot.paramMap.get('id') || '';

        setTimeout(() => {
          this.superheroService.deleteSuperhero(id);
          this.confirmationDialogService.stopLoading();
          this.router.navigate(['/']);
        }, 5000);
      });
  }

  navigateToEdit() {
    this.router.navigate(['/superhero', this.heroId, 'edit']);
  }

  showConfirmationDialog() {
    this.confirmationDialogService.showDialog();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
