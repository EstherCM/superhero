import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { SuperherosEditComponent } from './superheros-edit.component';

describe('SuperherosEditComponent', () => {
  let component: SuperherosEditComponent;
  let fixture: ComponentFixture<SuperherosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperherosEditComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '1' }) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperherosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
