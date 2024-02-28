import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperherosFilterComponent } from './superheros-filter.component';

describe('SuperherosFilterComponent', () => {
  let component: SuperherosFilterComponent;
  let fixture: ComponentFixture<SuperherosFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperherosFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperherosFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
