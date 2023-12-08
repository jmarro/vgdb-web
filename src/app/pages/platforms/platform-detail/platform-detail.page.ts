import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-platform-detail',
  templateUrl: './platform-detail.page.html',
  styleUrl: './platform-detail.page.scss'
})
export class PlatformDetailPage implements OnInit {
  constructor() {
  }

  ngOnInit() {
    console.log('platformDetail!');
  }

}