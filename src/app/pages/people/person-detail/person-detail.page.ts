import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { PeopleService } from '../../../services/people.service';
import { Person } from '../../../models/person.model';
import { NavigationEnd, Router } from '@angular/router';
import { DialogService } from '../../../components/dialog/utils/dialog.service';
import { DialogFactoryService } from '../../../components/dialog/utils/dialog-factory.service';

@Component({
  selector: 'vgdb-person-detail',
  templateUrl: './person-detail.page.html',
  styleUrl: './person-detail.page.scss'
})
export class PersonDetailPage implements OnInit, OnDestroy {

  public person: Person;
  public routerSubs: Subscription;
  public backgroundStyle: any = {'background-color': 'rgb(68, 67, 67)'};

  public dialog: DialogService;
  
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;
  @ViewChild('personForm') personForm: TemplateRef<any>;

  constructor(private dialogFactoryService: DialogFactoryService,
    private peopleService: PeopleService,
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

  public formSubmitted() {
    this.closeDialog();
    this.loadPerson();
  }

  public closeDialog() {
    this.dialog.close();
  }

  public deletePerson() {
    this.closeDialog();
    this.peopleService.deletePerson(this.person.id!).subscribe(result => {
      this.router.navigate(['people']);
    });
  }

  public presentEditDialog() {
    this.openDialog({
      headerText: 'Editar persona',
      template: this.personForm,
      context: this.person
    });
  }

  public presentDeleteDialog() {
    this.openDialog({
      headerText: 'Eliminar persona',
      template: this.deleteDialog
    });
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
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