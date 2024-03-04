import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperherosEditComponent } from './superheros-edit.component';

describe('SuperherosEditComponent', () => {
  let component: SuperherosEditComponent;
  let fixture: ComponentFixture<SuperherosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperherosEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperherosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
