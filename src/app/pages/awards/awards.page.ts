import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AwardsService } from '../../services/awards.service';
import { Award } from '../../models/award.model';
import { DialogService } from '../../components/dialog/utils/dialog.service';
import { DialogFactoryService } from '../../components/dialog/utils/dialog-factory.service';


@Component({
  selector: 'vgdb-awards',
  templateUrl: './awards.page.html',
  styleUrl: './awards.page.scss'
})
export class AwardsPage implements OnInit {

  public awards: Award[] = [];
  public dialog: DialogService;

  @ViewChild('awardForm') awardForm: TemplateRef<any>;

  constructor(private awardsService: AwardsService,
    private dialogFactoryService: DialogFactoryService,
    private router: Router) {
  }

  ngOnInit() {
    console.log('awards!');
    this.awardsService.getList().subscribe(result => {
      console.log('result', result);
      this.awards = result.awards;
    });
  }


  public formSubmitted(data: any) {
    this.closeDialog();
    this.router.navigate(['awards', data]);
  }

  public closeDialog() {
    this.dialog.close();
  }

  public dispatchNewDialog() {
    this.openDialog({
      headerText: 'Nuevo premio',
      template: this.awardForm
    });
  }

  public search(term: string) {
    this.awardsService.getFilteredList(term).subscribe(result => {
      console.log('result', result);
      this.awards = result.awards;
    });
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }


}