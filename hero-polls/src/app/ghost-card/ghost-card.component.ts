import { Component, OnInit } from '@angular/core';

/* Ce composant est utilisé à des fins de placeholder
 * A l'image de gros sites internet asynchrones comme Youtube et Facebook,
 * J'ai décidé que disposer de cartes au contenu grisé simple
 * Etait plaisant du point de vue utilisateur, et fait passer l'attente de contenu
 * */

@Component({
  selector: 'hp-ghost-card',
  template: `
   <!--Card image-->
  <div class="image"></div>

<mdb-card-body>
  <mdb-card-title>
    <div id="title_placeholder"></div>
  </mdb-card-title>

  <div id="button_placeholder"></div>
</mdb-card-body>
  `,
  styles: [
    `
    .image{
      width:100%;
      height:200px;
      background-color:		#D8D8D8;
      object-fit: cover;
      overflow:hidden;
    }
    .image > img{
      display: none;
    }

    #title_placeholder{
      width : 75%;
      height: 1.5em;
      background-color:#E0E0E0;
      border-radius: 4px;
    }

    #button_placeholder{
      margin-top: 10px;
      width : 50%;
      height: 1em;
      background-color:	#E8E8E8;
      border-radius: 2px;
    }
    `
  ]
})
export class GhostCardComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

}