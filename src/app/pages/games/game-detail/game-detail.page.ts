import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.page.html',
  styleUrl: './game-detail.page.scss'
})
export class GameDetailPage implements OnInit {
  constructor() {
  }

  ngOnInit() {
    console.log('gamesDetail!');
  }

}