import { Component } from '@angular/core';

/* Ce composant est le coeur du site Angular
 * Il permet de charger du contenu déjà formatté
 * Au sein d'une division container bootstrap.
 * Permet aussi une barre de navigation, accessible partout
 * */

@Component({
  selector: 'hp-root',
  template: `
    <!-- barre de navigation -->
    <nav id="navbar" class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav">
            <a class="nav-item nav-link" routerLink="/">Home</a>
            <a class="nav-item nav-link" routerLink="/versus">Versus</a>
            <a class="nav-item nav-link" routerLink="/heroes">Heroes</a>
            <a class="nav-item nav-link" routerLink="/battles">Battles</a>
        </div>
    </nav>

    <!-- contenu dans un container -->
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
