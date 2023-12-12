import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.page.html',
  styleUrl: './game-detail.page.scss'
})
export class GameDetailPage implements OnInit {
  public cover: boolean = true;
  public owned: boolean = false;


  constructor() {

  }

  

  ngOnInit() {
    console.log('gamesDetail!');
    this.cover = true;
  }

  public gameOwned(e: any) {
    console.log(e);
  }

}