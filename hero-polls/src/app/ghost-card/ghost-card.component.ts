import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hp-ghost-card',
  template: `
   <!--Card image-->
  <div class="image"></div>

<mdb-card-body>
  <mdb-card-title>
    <div id="title_placeholder"></div>
  </mdb-card-title>

  <!--><a mdbBtn color="dark" mdbWavesEffect>Details</a> <!-->
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