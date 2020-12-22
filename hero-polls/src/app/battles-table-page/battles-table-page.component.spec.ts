import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlesTablePageComponent } from './battles-table-page.component';

describe('BattlesTablePageComponent', () => {
  let component: BattlesTablePageComponent;
  let fixture: ComponentFixture<BattlesTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattlesTablePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlesTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
