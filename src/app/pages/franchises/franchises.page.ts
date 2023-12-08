import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-franchises',
  templateUrl: './franchises.page.html',
  styleUrl: './franchises.page.scss'
})
export class FranchisesPage implements OnInit {
  constructor() {
  }

  ngOnInit() {
    console.log('franchises!');
  }

}