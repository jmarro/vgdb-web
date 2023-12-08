import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.page.html',
  styleUrl: './companies.page.scss'
})
export class CompaniesPage implements OnInit {
  constructor() {
  }

  ngOnInit() {
    console.log('companies!');
  }

}