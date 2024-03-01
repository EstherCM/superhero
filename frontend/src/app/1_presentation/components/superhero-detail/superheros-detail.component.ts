import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Chart from 'chart.js/auto';

import { SuperheroRepository } from '../../../2_domain/repositories/superhero.service';
import { ISuperhero } from '../../../2_domain/models/superhero-display';

@Component({
  selector: 'sp-detail',
  templateUrl: './superheros-detail.component.html',
  styleUrls: ['../../../../styles/superhero-detail.scss'],
})
export class SuperherosDetailComponent {
  @ViewChild('stats') statsRef!: ElementRef;

  public heroId: string | null = '';
  public hero!: ISuperhero;

  constructor(
    private route: ActivatedRoute,
    private superheroRepository: SuperheroRepository
  ) {}

  ngAfterViewInit() {
    const ctx = this.statsRef.nativeElement.getContext('2d');
    const labels = Object.keys(this.hero.powerstats);
    const data = Object.values(this.hero.powerstats);

    new Chart.Chart(ctx, {
      type: 'radar',
      data: {
        labels,
        datasets: [{
          label: 'Estadísticas',
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }
    });
  }

  ngOnInit() {
    this.heroId = this.route.snapshot.paramMap.get('id');
    this.superheroRepository.getById(this.heroId).subscribe((superhero) => this.hero = superhero);
  }
}
