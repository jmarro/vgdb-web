import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { PeopleService } from '../../../services/people.service';
import { Person } from '../../../models/person.model';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'vgdb-person-detail',
  templateUrl: './person-detail.page.html',
  styleUrl: './person-detail.page.scss'
})
export class PersonDetailPage implements OnInit, OnDestroy {

  public person: Person;
  public routerSubs: Subscription;

  constructor(private peopleService: PeopleService,
    private router: Router) {
  }

  ngOnInit() {
    this.loadPerson();
    console.log('personDetail!');
    this.routerSubs = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))  
    .subscribe((event: any) => {
      console.log('hpl')
      this.loadPerson();
    });
  }

  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  }

  private loadPerson() {
    const split = this.router.url.split('/');
    const id = parseInt(split[split.length - 1]);
    this.peopleService.getPerson(id).subscribe(result => {
      console.log('perosn', result)
      this.person = result;
    });
  }

}