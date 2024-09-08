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
  public itemsTotal: number;
  public term = '';

  @ViewChild('awardForm') awardForm: TemplateRef<any>;

  constructor(private awardsService: AwardsService,
    private dialogFactoryService: DialogFactoryService,
    private router: Router) {
  }

  ngOnInit() {
    console.log('awards!');
    this.getAwards(0);
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

  public search(term: string, page: number) {
    this.term = term;
    this.awardsService.getFilteredList(term, page).subscribe(result => {
      console.log('result', result);
      this.awards = result.awards;
    });
  }

  public pageChange(page: number) {
    this.term.length ? this.search(this.term, page) : this.getAwards(page);
  }

  public navigateTo(event: any) {
    this.router.navigate(['awards', event]);
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }

  private getAwards(page: number) {
    this.awardsService.getList(page).subscribe(result => {
      console.log('result', result);
      this.awards = result.awards;
      this.itemsTotal = result.count;
    });
  }


}