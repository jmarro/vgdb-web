import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrl: './characters.page.scss'
})
export class CharactersPage implements OnInit {
  constructor() {
  }

  ngOnInit() {
    console.log('characters!');
  }

}