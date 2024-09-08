import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../models/character.model';
import { DialogService } from '../../components/dialog/utils/dialog.service';
import { DialogFactoryService } from '../../components/dialog/utils/dialog-factory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vgdb-characters',
  templateUrl: './characters.page.html',
  styleUrl: './characters.page.scss'
})
export class CharactersPage implements OnInit {

  public characters: Character[] = [];
  public dialog: DialogService;
  public itemsTotal: number;
  public term = '';

  @ViewChild('characterForm') characterForm: TemplateRef<any>;

  constructor(private charactersService: CharactersService,
    private dialogFactoryService: DialogFactoryService,
    private router: Router) {
  }

  ngOnInit() {
    console.log('characters!');
    this.getCharacters(0);
  }

  public formSubmitted(data: any) {
    this.closeDialog();
    this.router.navigate(['characters', data]);
  }

  public closeDialog() {
    this.dialog.close();
  }

  public dispatchNewDialog() {
    this.openDialog({
      headerText: 'Nuevo personaje',
      template: this.characterForm
    });
  }

  public search(term: string, page: number) {
    this.term = term;
    this.charactersService.getFilteredList(term, page).subscribe(result => {
      console.log('result', result);
      this.characters = result.characters;
      this.itemsTotal = result.count;
    });
  }

  public pageChange(page: number) {
    this.term.length ? this.search(this.term, page) : this.getCharacters(page);
  }

  public navigateTo(event: any) {
    this.router.navigate(['characters', event]);
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }

  private getCharacters(page: number) {
    this.charactersService.getList(page).subscribe(result => {
      console.log('result', result);
      this.characters = result.characters;
      this.itemsTotal = result.count;
    });
  }

}
