import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { SuperherosDetailComponent } from './superheros-detail.component';

describe('SuperherosDetailComponent', () => {
  let component: SuperherosDetailComponent;
  let fixture: ComponentFixture<SuperherosDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperherosDetailComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '1' }) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperherosDetailComponent);
    component = fixture.componentInstance;
    component.hero = {
      id: '',
      name: '',
      image: '',
      appearance: {
        eyeColor: '',
        gender: '',
        hairColor: '',
        height: '',
        race: '',
        weight: '',
      },
      biography: {
        fullName: '',
        placeOfBirth: '',
      },
      connections: {
        relatives: [],
      },
      powerstats: {
        combat: 0,
        durability: 0,
        intelligence: 0,
        power: 0,
        speed: 0,
        strength: 0,
      },
      work: '',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
