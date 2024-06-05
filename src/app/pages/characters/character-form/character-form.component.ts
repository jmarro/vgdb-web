import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Character } from '../../../models/character.model';
import { CharactersService } from '../../../services/characters.service';

@Component({
  selector: 'vgdb-character-form',
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.scss'
})
export class CharacterFormComponent implements OnInit {

  @Input() data?: Character;
  @Output() submitted: any = new EventEmitter<any>();
  
  public characterForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private characterService: CharactersService) {
  }

  ngOnInit(): void {
    this.characterForm = this.createForm(this.data);
    console.log('data', this.data)
  }

  public onSubmit() {
    console.log(this.characterForm.value);
    if (!this.data) {
      this.characterService.createCharacter(this.characterForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(result.id);
      });
    } else {
      this.characterService.updateCharacter(this.data.id!, this.characterForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(true);
      });
    }
  }

  private createForm(data?: Character) {
    return this.formBuilder.group({
      name: [data?.name, Validators.required],
      full_name: [data?.full_name],
      alias: [data?.alias],
      alt_names: [data?.alt_names],
      creation_year: [data?.creation_year],
      main_img: [data?.main_img],
      color: [data?.color],
      wikipedia: [data?.wikipedia],
      is_main: [data?.is_main]
    });
  }
}
