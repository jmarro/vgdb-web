import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'vg';

  constructor(private router: Router) {
  }
  ngOnInit() {
    console.log('hi')
  }

  public goHome() {
    this.router.navigate(['/', 'home']);
  }

}
