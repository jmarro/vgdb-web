import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrl: './character-detail.page.scss'
})
export class CharacterDetailPage implements OnInit {
  constructor() {
  }

  ngOnInit() {
    console.log('charaxDetail!');
  }

}