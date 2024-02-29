import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sp-detail',
  templateUrl: './superheros-detail.component.html',
  styleUrls: [],
})
export class SuperherosDetailComponent {
  public heroId: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.heroId = this.route.snapshot.paramMap.get('id');
  }
}
