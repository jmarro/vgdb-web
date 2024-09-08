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
  public itemsTotal: number;
  public term = '';

  @ViewChild('personForm') personForm: TemplateRef<any>;

  constructor(private dialogFactoryService: DialogFactoryService,
    private peopleService: PeopleService,
    private router: Router) {
  }

  ngOnInit() {
    console.log('people!');
    this.getPeople(0);
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

  public search(term: string, page: number) {
    this.term = term;
    this.peopleService.getFilteredList(term, page).subscribe(result => {
      console.log('result', result);
      this.people = result.people;
      this.itemsTotal = result.count;
    });
  }

  public pageChange(page: number) {
    this.term.length ? this.search(this.term, page) : this.getPeople(page);
  }

  public navigateTo(event: any) {
    this.router.navigate(['people', event]);
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }

  private getPeople(page: number) {
    this.peopleService.getList(page).subscribe(result => {
      console.log('result', result);
      this.people = result.people;
      this.itemsTotal = result.count;
    });
  }
}
