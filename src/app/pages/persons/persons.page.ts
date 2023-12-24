import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.page.html',
  styleUrl: './persons.page.scss'
})
export class PersonsPage implements OnInit {
  constructor() {
  }

  ngOnInit() {
    console.log('persons!');
  }

}