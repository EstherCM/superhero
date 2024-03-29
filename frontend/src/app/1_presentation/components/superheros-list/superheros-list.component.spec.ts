import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SuperherosListComponent } from './superheros-list.component';

describe('SuperherosListComponent', () => {
  let component: SuperherosListComponent;
  let fixture: ComponentFixture<SuperherosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SuperherosListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperherosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
