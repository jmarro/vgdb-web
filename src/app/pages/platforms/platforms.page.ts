import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.page.html',
  styleUrl: './platforms.page.scss'
})
export class PlatformsPage implements OnInit {
  constructor() {
  }

  ngOnInit() {
    console.log('platforms!');
  }

}