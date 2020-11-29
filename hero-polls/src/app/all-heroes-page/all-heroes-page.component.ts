import { Component, OnInit } from '@angular/core';

import {NgbConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hp-all-heroes-page',
  template: `
  <div class="container">
    <p>
      all-heroes-page works!
    </p>
    
    <hp-hero-list></hp-hero-list>
</div>
  `,
  styles: [
  ]
})
export class AllHeroesPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
