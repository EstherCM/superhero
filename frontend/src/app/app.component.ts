import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    '../styles/header.scss',
    '../styles/superhero-list.scss',
    '../styles/button.scss',
  ],
})
export class AppComponent {
  public showFilterBar = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    document.addEventListener('click', (event) => this.handleOutFilterClick(event));
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
    const appFiltersElement =
      this.el.nativeElement.querySelector('#filtersBar');
    const clickedNode = event.target as Node;

    if (!this.isInFilterBar(appFiltersElement, clickedNode)) {
      this.closeFilters();
    }
  }
}
