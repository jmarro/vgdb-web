import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game } from '../../../models/game.model';
import { GamesService } from '../../../services/games.service';
import { GameStatus } from '../../../enums/game-status.enum';

@Component({
  selector: 'vgdb-games-filters',
  templateUrl: './games-filters.component.html',
  styleUrl: './games-filters.component.scss'
})
export class GamesFiltersComponent implements OnInit {

  @Input() data?: any;
  @Output() submitted: any = new EventEmitter<any>();
  
  public gamesFilters: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private gamesService: GamesService) {
  }

  ngOnInit(): void {
    this.gamesFilters = this.createForm(this.data);
  }

  public onSubmit() {
    this.submitted.emit(this.gamesFilters.value);
  }

  private createForm(data?: any) {
    return this.formBuilder.group({
      order_by: [data? data.order_by : 'score', Validators.required],
    });
  }
}
