import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.page.html',
  styleUrl: './company-detail.page.scss'
})
export class CompanyDetailPage implements OnInit {
  constructor() {
  }

  ngOnInit() {
    console.log('companyDetail!');
  }

}