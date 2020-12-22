import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHeroesPageComponent } from './all-heroes-page.component';

describe('AllHeroesPageComponent', () => {
  let component: AllHeroesPageComponent;
  let fixture: ComponentFixture<AllHeroesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllHeroesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllHeroesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
