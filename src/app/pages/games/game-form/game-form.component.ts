import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game } from '../../../models/game.model';
import { GamesService } from '../../../services/games.service';
import { GameStatus } from '../../../enums/game-status.enum';

@Component({
  selector: 'vgdb-game-form',
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.scss'
})
export class GameFormComponent implements OnInit {

  public readonly GameStatus: typeof GameStatus = GameStatus;

  @Input() data?: Game;
  @Output() submitted: any = new EventEmitter<any>();
  
  public gameForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private gamesService: GamesService) {
  }

  ngOnInit(): void {
    this.gameForm = this.createForm(this.data);
    console.log('data', this.data)
  }

  public onSubmit() {
    console.log(this.gameForm.value);
    if (!this.data) {
      this.gamesService.createGame(this.gameForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(result.id);
      });
    } else {
      this.gamesService.updateGame(this.data.id!, this.gameForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(true);
      });
    }
  }

  private createForm(data?: Game) {
    return this.formBuilder.group({
      name: [data?.name, Validators.required],
      release_date: [data?.release_date, Validators.required],
      color: [data?.color],
      main_img: [data?.main_img],
      back_cover: [data?.back_cover],
      logo: [data?.logo],
      score: [data?.score],
      price: [data?.price],
      format: [data?.format],
      num_players: [data?.num_players],
      personal_status: [data? data.personal_status : GameStatus.notPlayed, Validators.required],
      owned: [data?.owned],
      alt_name: [data?.alt_name],
      media: [data?.media],
      wikipedia: [data?.wikipedia]
    });
  }
}
