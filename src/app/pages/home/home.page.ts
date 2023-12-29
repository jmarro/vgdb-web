import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vgdb-home',
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage implements OnInit {
  constructor() {
  }

  ngOnInit() {
    console.log('home!');
  }

}