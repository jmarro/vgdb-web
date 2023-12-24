import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-franchise-detail',
  templateUrl: './franchise-detail.page.html',
  styleUrl: './franchise-detail.page.scss'
})
export class FranchiseDetailPage implements OnInit {
  constructor() {
  }

  ngOnInit() {
    console.log('franchiseDetail!');
  }

}