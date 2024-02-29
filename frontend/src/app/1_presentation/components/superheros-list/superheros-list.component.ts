import { Component, ElementRef } from '@angular/core';

import { SuperheroRepository } from '../../../2_domain/repositories/superhero.service';
import { ISuperhero } from '../../../2_domain/models/superhero-display';
import { SuperheroService } from '../../services/superhero.service';

@Component({
  selector: 'sh-list',
  templateUrl: './superheros-list.component.html',
  styleUrls: [
    '../../../../styles/superhero-list.scss',
    '../../../../styles/superhero-item.scss',
    '../../../../styles/button.scss',
  ],
})
export class SuperherosListComponent {
  public superheros: ISuperhero[] = [];
  public showFilterBar = false;

  constructor(
    private superheroRepository: SuperheroRepository,
    private el: ElementRef
  ) {}

  ngOnInit() {
    document.addEventListener('click', (event) => this.handleOutFilterClick(event));

    const filters = {
      name: '',
    };

    return this.superheroRepository.get(filters).subscribe({
      next: (superheros: ISuperhero[]) => (this.superheros = superheros),
      error: (error) => console.error('🔥 Error getting superheros:', error),
    });
  }

  toggleFilterBar(event: Event) {
    event.stopPropagation();

    this.showFilterBar = !this.showFilterBar;
  }

  closeFilters() {
    this.showFilterBar = false;
  }

  private isInFilterBar(parent: Node, child: Node): boolean {
    let node: Node | null = child;

    while (node !== null && node !== parent) {
      node = node.parentNode;
    }

    return node === parent;
  }

  handleOutFilterClick(event: Event) {
    const appFiltersElement = this.el.nativeElement.querySelector('#filtersBar');
    const clickedNode = event.target as Node;

    if (!this.isInFilterBar(appFiltersElement, clickedNode)) {
      this.closeFilters();
    }
  }

  updateSuperheros(superheros: ISuperhero[]) {
    this.superheros = superheros;
    this.closeFilters();
  }
}
