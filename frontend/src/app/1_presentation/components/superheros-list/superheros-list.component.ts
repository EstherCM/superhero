import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { SuperheroRepository } from '../../../2_domain/repositories/superhero.service';
import { ISuperhero } from '../../../2_domain/models/superhero-display';

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
  public superheros: Partial<ISuperhero>[] = [];
  public showFilterBar = false;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private superheroRepository: SuperheroRepository,
    private el: ElementRef,
    private router: Router
  ) {}

  ngOnInit() {
    document.addEventListener('click', (event) => this.handleOutFilterClick(event));

    const filters = {
      name: '',
    };

    return this.superheroRepository
      .get(filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (superheros: Partial<ISuperhero>[]) => (this.superheros = superheros),
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

  updateSuperheros(superheros: Partial<ISuperhero>[]) {
    this.superheros = superheros;
    this.closeFilters();
  }

  navigateToDetail(id: string | undefined) {
    this.router.navigate(['/superhero', id]);
  }

  navigateToCreation() {
    this.router.navigate(['superhero/create']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
