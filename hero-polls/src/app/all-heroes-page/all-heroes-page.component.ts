import { Component, OnInit } from '@angular/core';

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
