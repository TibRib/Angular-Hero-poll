import { Component } from '@angular/core';


@Component({
  selector: 'hp-root',
  template: `
    <!-- navigation -->
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav">
            <a class="nav-item nav-link" routerLink="/">Home</a>
            <a class="nav-item nav-link" routerLink="/versus">Versus</a>
            <a class="nav-item nav-link" routerLink="/heroes">Heroes</a>
        </div>
    </nav>

    <!-- contenu -->
    <div class="jumbotron min-vh-100">
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    </div>

  `,
  styles: [
    `
    .navbar{
      z-index: 99 !important;
    }
    `
  ]
})
export class AppComponent {
  title = 'hero-polls';
}
