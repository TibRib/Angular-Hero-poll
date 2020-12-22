import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhostCardComponent } from './ghost-card.component';

describe('GhostCardComponent', () => {
  let component: GhostCardComponent;
  let fixture: ComponentFixture<GhostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GhostCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GhostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
