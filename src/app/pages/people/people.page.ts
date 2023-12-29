import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'vgdb-people',
  templateUrl: './people.page.html',
  styleUrl: './people.page.scss'
})
export class PeoplePage implements OnInit {

  public people: Person[] = [];

  constructor(private peopleService: PeopleService) {
  }

  ngOnInit() {
    console.log('people!');
    this.peopleService.getList().subscribe(result => {
      console.log('result', result);
      this.people = result.people;
    });
  }

  public create() {
    console.log('create')
    const newplatform: Person = {
      name: 'Yūji Naka',
      birthday: new Date('09/17/1965'),
      main_img: 'Yuji_Naka.jpeg',
      nationality: 'jp'
    }
    this.peopleService.createPlatform(newplatform).subscribe(result => {
      console.log('ok??', result)
    })
  }


}