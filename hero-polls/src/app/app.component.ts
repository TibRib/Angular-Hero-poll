import { Component } from '@angular/core';


@Component({
  selector: 'hp-root',
  template: `
    <!-- nav -->
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav">
            <a class="nav-item nav-link" routerLink="/">Home</a>
            <a class="nav-item nav-link" routerLink="/versus">Versus</a>
            <a class="nav-item nav-link" routerLink="/heroes">Heroes</a>
        </div>
    </nav>

    <!-- main content container -->
    <div class="jumbotron">
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'hero-polls';
}
