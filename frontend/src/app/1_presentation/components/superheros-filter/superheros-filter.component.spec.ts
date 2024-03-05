import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SuperherosFilterComponent } from './superheros-filter.component';
import { LoaderComponent } from '../loader/loader.component';

describe('SuperherosFilterComponent', () => {
  let component: SuperherosFilterComponent;
  let fixture: ComponentFixture<SuperherosFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperherosFilterComponent, LoaderComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperherosFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
