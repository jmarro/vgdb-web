import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vgdb-games',
  templateUrl: './games.page.html',
  styleUrl: './games.page.scss'
})
export class GamesPage implements OnInit {
  constructor() {
  }

  ngOnInit() {
    console.log('games!');
  }

}