import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Franchise } from '../../models/franchise.model';
import { FranchisesService } from '../../services/franchises.service';
import { DialogService } from '../../components/dialog/utils/dialog.service';
import { DialogFactoryService } from '../../components/dialog/utils/dialog-factory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vgdb-franchises',
  templateUrl: './franchises.page.html',
  styleUrl: './franchises.page.scss'
})
export class FranchisesPage implements OnInit {
  public franchises: Franchise[] = [];
  public dialog: DialogService;

  @ViewChild('franchiseForm') franchiseForm: TemplateRef<any>;

  constructor(private franchisesService: FranchisesService,
    private dialogFactoryService: DialogFactoryService,
    private router: Router) {
  }

  ngOnInit() {
    console.log('franchises!');
    this.franchisesService.getList().subscribe(result => {
      console.log('result', result);
      this.franchises = result.franchises;
    });
  }

  public formSubmitted(data: any) {
    this.closeDialog();
    this.router.navigate(['franchises', data]);
  }

  public closeDialog() {
    this.dialog.close();
  }

  public dispatchNewDialog() {
    this.openDialog({
      headerText: 'Nueva franquicia',
      template: this.franchiseForm
    });
  }

  public search(term: string) {
    this.franchisesService.getFilteredList(term).subscribe(result => {
      console.log('result', result);
      this.franchises = result.franchises;
    });
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }

}
