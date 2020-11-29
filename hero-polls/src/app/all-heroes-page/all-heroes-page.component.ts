import { Component, OnInit } from '@angular/core';

import {NgbConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hp-all-heroes-page',
  template: `
    <p>
      all-heroes-page works!
    </p>
    
    <hp-hero-list></hp-hero-list>
  `,
  styles: [
  ]
})
export class AllHeroesPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
