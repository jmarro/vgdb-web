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

  public itemsTotal: number;
  public term = '';

  @ViewChild('gameForm') gameForm: TemplateRef<any>;

  constructor(private dialogFactoryService: DialogFactoryService,
    private gamesService: GamesService,
    private router: Router) {
  }

  ngOnInit() {
    this.getGames(0);
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

  public search(term: string, page: number) {
    this.term = term;
    this.gamesService.getFilteredList(term, page).subscribe(result => {
      console.log('result', result);
      this.games = result.games;
      this.itemsTotal = result.count;
    });
  }

  public navigateTo(event: any) {
    this.router.navigate(['games', event]);
  }

  public pageChange(page: number) {
    this.term.length ? this.search(this.term, page) : this.getGames(page);
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }

  private getGames(page: number) {
    this.gamesService.getList(page).subscribe(result => {
      console.log('result', result);
      this.games = result.games;
      this.itemsTotal = result.count;
    });
  }

}