import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperherosCreateComponent } from './superheros-create.component';

describe('SuperherosCreateComponent', () => {
  let component: SuperherosCreateComponent;
  let fixture: ComponentFixture<SuperherosCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperherosCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperherosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
