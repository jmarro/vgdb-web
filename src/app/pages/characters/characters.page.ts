import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../models/character.model';
import { CharacterRole } from '../../enums/character-role.enum';

@Component({
  selector: 'vgdb-characters',
  templateUrl: './characters.page.html',
  styleUrl: './characters.page.scss'
})
export class CharactersPage implements OnInit {

  public characters: Character[] = [];

  constructor(private charactersService: CharactersService) {
  }

  ngOnInit() {
    console.log('characters!');
    this.charactersService.getList().subscribe(result => {
      console.log('result', result);
      this.characters = result.characters;
    });
  }

  public create() {
    console.log('create')
    const newplatform: Character = {
      name: 'Doctor Robotnik',
      full_name: 'Doctor Ivo Robotnik',
      alias: 'Eggman',
      alt_names: 'Doctor Eggman',
      creation_year: 1991,
      color: '#b60505',
      franchise_id: 1,
      role_in_franchise: CharacterRole.antagonist,
      main_img: 'sonic/robotnik.jpeg'
    }
    /*const newplatform: Character = {
      name: 'Sonic',
      full_name: 'Sonic the Hedgehog',
      creation_year: 1991,
      color: '#17569b',
      franchise_id: 1,
      role_in_franchise: CharacterRole.main,
      main_img: 'sonic/sonic.jpeg'
    }*/
    this.charactersService.createCharacter(newplatform).subscribe(result => {
      console.log('ok??', result)
    })
  }


}