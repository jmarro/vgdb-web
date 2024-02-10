import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game.model';
import { GamesService } from '../../services/games.service';
import { GameStatus } from '../../enums/game-status.enum';

@Component({
  selector: 'vgdb-games',
  templateUrl: './games.page.html',
  styleUrl: './games.page.scss'
})
export class GamesPage implements OnInit {
  public games: Game[] = [];

  constructor(private gamesService: GamesService) {
  }

  ngOnInit() {
    console.log('games!');
    this.gamesService.getList().subscribe(result => {
      console.log('result', result);
      this.games = result.games;
    });
    
  }

  public create() {
    console.log('create')
    const newcompany: Game = {
      
      name: 'Sonic the Hedgehog',
      release_date: new Date('07/26/1991'),
      color: '#17569b',
      main_img: 'sonic/sonic_the_hedgehog/cover.jpeg',
      back_cover: 'sonic/sonic_the_hedgehog/back.jpg',
      logo: 'sonic/sonic_the_hedgehog/logo.png',
      score: 86,
      price: 15,
      format: 'PAL-EUR',
      num_players: '1',
      personal_status: GameStatus.completed,
      owned: true,
      franchiseId: 1,
      serieId: 1,
      wikipedia: 'https://es.wikipedia.org/wiki/Sonic_the_Hedgehog_(videojuego_de_1991)'
    }

    this.gamesService.createGame(newcompany).subscribe(result => {
      console.log('ok??', result)
    });
  }

}