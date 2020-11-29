import { Component, OnInit } from '@angular/core';
import { PersoService } from '../perso.service';

@Component({
  selector: 'hp-hero-list',
  template: `
    <p>
      hero-list works!
    </p>
    <hp-hero-card></hp-hero-card>
  `,
  styles: [
  ]
})
export class HeroListComponent implements OnInit {

  constructor(private heroService: PersoService) { }
  
  ngOnInit(): void {
  }

}
