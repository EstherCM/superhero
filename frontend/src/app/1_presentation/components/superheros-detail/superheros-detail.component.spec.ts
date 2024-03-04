import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperherosDetailComponent } from './superheros-detail.component';

describe('SuperherosDetailComponent', () => {
  let component: SuperherosDetailComponent;
  let fixture: ComponentFixture<SuperherosDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperherosDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperherosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
