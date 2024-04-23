import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Game } from '../../models/game.model';
import { GamesService } from '../../services/games.service';
import { DialogService } from '../../components/dialog/utils/dialog.service';
import { DialogFactoryService } from '../../components/dialog/utils/dialog-factory.service';

@Component({
  selector: 'vgdb-games',
  templateUrl: './games.page.html',
  styleUrl: './games.page.scss'
})
export class GamesPage implements OnInit {

  public dialog: DialogService;
  public games: Game[] = [];

  @ViewChild('gameForm') gameForm: TemplateRef<any>;

  constructor(private dialogFactoryService: DialogFactoryService,
    private gamesService: GamesService,
    private router: Router) {
  }

  ngOnInit() {
    console.log('games!');
    this.gamesService.getList().subscribe(result => {
      console.log('result', result);
      this.games = result.games;
    });
  }

  public formSubmitted(data: any) {
    this.closeDialog();
    this.router.navigate(['games', data]);
  }

  public closeDialog() {
    this.dialog.close();
  }

  public dispatchNewDialog() {
    this.openDialog({
      headerText: 'Nuevo juego',
      template: this.gameForm
    });
  }

  public search(term: string) {
    this.gamesService.getFilteredList(term).subscribe(result => {
      console.log('result', result);
      this.games = result.games;
    });
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }



}