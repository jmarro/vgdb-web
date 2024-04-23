import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AwardResult } from '../../../enums/award-result.enum';
import { GamesService } from '../../../services/games.service';
import { Award } from '../../../models/award.model';
import { Observable, map, mergeMap, of, startWith, tap } from 'rxjs';
import { AwardCategory } from '../../../models/awardCategory.model';
import { AwardsResponse, AwardsService } from '../../../services/awards.service';

@Component({
  selector: 'vgdb-game-award-form',
  templateUrl: './game-award-form.component.html',
  styleUrl: './game-award-form.component.scss'
})
export class GameAwardFormComponent implements OnInit {

  @Input() gameId: number;
  @Output() submitted: any = new EventEmitter<any>();
  
  public readonly AwardResult: typeof AwardResult = AwardResult;

  public gameAwardForm: FormGroup;

  public awards: Award[];
  public filteredAwards: Observable<Award[]>;
  public awardsInCurrentSearch: Award[];
  public categoriesFromAward: AwardCategory[];

  constructor(private awardsService: AwardsService,
    private formBuilder: FormBuilder,
    private gamesService: GamesService) {
  }

  ngOnInit(): void {
    this.categoriesFromAward = [];
    this.awardsService.getList().subscribe(result => {
      this.gameAwardForm = this.createForm();
      this.awards = result.awards;

      this.filteredAwards = this.gameAwardForm.controls['awardId'].valueChanges.pipe(
        startWith(''),
        mergeMap(text => text? this.awardsService.getFilteredList(text):  of({} as AwardsResponse)),
        map(awardsRes => (awardsRes.awards ? awardsRes.awards : this.awards.slice())),
        tap((awards) => { this.awardsInCurrentSearch = awards} )
      );
    });
  }

  public onSubmit() {
    console.log(this.gameAwardForm.value);
    this.gamesService.addAwards(this.gameId, [this.gameAwardForm.value]).subscribe(result => {
      console.log('ok??', result)
      this.submitted.emit(result.id);
    });
  }

  public displayName(awards: Award[]) {
    return (id: any) => awards && awards.length && awards.find(award => award.id === id)? awards.find(award => award.id === id)!.name : ''; 
  }

  public getCategories(value: number) {
    this.awardsService.getAward(value).subscribe(result => {
      console.log(result)
      this.categoriesFromAward = result.categories!;
    });
  }

  private createForm() {
    return this.formBuilder.group({
      awardId: [null, Validators.required],
      AwardCategoryId: [null, Validators.required],
      year: [null, Validators.required],
      result: [AwardResult.winner, Validators.required],
      GameId: [this.gameId, Validators.required]
    });
  }
}
