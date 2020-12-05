import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hp-home',
  template: `
    <video autoplay muted loop id="myVideo">
      <source src="./assets/battle_bg.webm" type="video/webm">
    </video>

    <div class="content text-center">
      <div class="contentHolder">
        <h1 id="title_main">Hero polls</h1>

        <div class="col-9 mx-auto">
          <a routerLink="/versus" class="btn btn-block btn-lg btn-primary rounded-pill mb-3">Versus</a>
          <a routerLink="/heroes" class="btn btn-block btn-danger rounded-pill">All Heroes</a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    
    @font-face {
      font-family: "Kestrel";
      src: url("assets/kestrel.otf") format("opentype"),
      }

    #myVideo {
      position: fixed;
      z-index: 0;
      right: 0;
      bottom: 0;
      min-width: 100vw;
      min-height: 100vh;
      filter: blur(5px);
      object-fit : cover;
    }

    #title_main{
      font-size : 8em;
      font-family: "Helvetica"
    }

    /* Add some content at the bottom of the video/page */
    .content {
      position: fixed;
      left: 0;
      top: 0;
      
      width : 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }
    .contentHolder{
      position: fixed;
      left: 25%;
      top: 25%;
      padding: 20px;
      width: 50%;
      height : 50%;
      color : white;
    }
    
    `
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
