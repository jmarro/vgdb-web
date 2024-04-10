import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DialogFactoryService } from '../../components/dialog/utils/dialog-factory.service';

import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';
import { DialogService } from '../../components/dialog/utils/dialog.service';

@Component({
  selector: 'vgdb-people',
  templateUrl: './people.page.html',
  styleUrl: './people.page.scss'
})
export class PeoplePage implements OnInit {

  public dialog: DialogService;
  public people: Person[] = [];

  @ViewChild('personForm') personForm: TemplateRef<any>;

  constructor(private dialogFactoryService: DialogFactoryService,
    private peopleService: PeopleService,
    private router: Router) {
  }

  ngOnInit() {
    console.log('people!');
    this.peopleService.getList().subscribe(result => {
      console.log('result', result);
      this.people = result.people;
    });
  }

  public formSubmitted(data: any) {
    this.closeDialog();
    this.router.navigate(['people', data]);
  }

  public closeDialog() {
    this.dialog.close();
  }

  public dispatchNewDialog() {
    this.openDialog({
      headerText: 'Nueva persona',
      template: this.personForm
    });
  }

  public search(term: string) {
    this.peopleService.getFilteredList(term).subscribe(result => {
      console.log('result', result);
      this.people = result.people;
    });
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }
}
