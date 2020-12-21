import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroVotableComponent } from './hero-votable.component';

describe('HeroVotableComponent', () => {
  let component: HeroVotableComponent;
  let fixture: ComponentFixture<HeroVotableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroVotableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroVotableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
