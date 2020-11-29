import { Component } from '@angular/core';

@Component({
  selector: 'hp-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title}}!
      </h1>
    </div>
    <hp-all-heroes-page></hp-all-heroes-page>
  `,
  styles: []
})
export class AppComponent {
  title = 'hero-polls';
}
