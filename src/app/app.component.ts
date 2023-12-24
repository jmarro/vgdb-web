import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'vg';

  constructor(private httpService: HttpClient,
              private router: Router) {
  }
  ngOnInit() {
    console.log('hi')

    /*this.httpService.post('http://localhost:3000/companies', {name: 'mycomp', something: 'some'}).subscribe((result) => {
      console.log('post', result);
    })*/
  }

  public goHome() {
    this.router.navigate(['/', 'home']);
  }
}
