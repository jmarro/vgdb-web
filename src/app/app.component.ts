import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'vg';

  constructor(private httpService: HttpClient) {
  }
  ngOnInit() {
    console.log('hi')
    this.httpService.get('http://localhost:3000/games').subscribe((result) => {
      console.log(result);
    })
  }
}
