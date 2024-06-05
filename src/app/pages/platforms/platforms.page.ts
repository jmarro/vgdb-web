import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '../../models/platform.model';
import { PlatformsService } from '../../services/platforms.service';
import { DialogService } from '../../components/dialog/utils/dialog.service';
import { DialogFactoryService } from '../../components/dialog/utils/dialog-factory.service';

@Component({
  selector: 'vgdb-platforms',
  templateUrl: './platforms.page.html',
  styleUrl: './platforms.page.scss'
})
export class PlatformsPage implements OnInit {

  public dialog: DialogService;
  public platforms: Platform[] = [];  
  public itemsTotal: number;
  public term = '';

  @ViewChild('platformForm') platformForm: TemplateRef<any>;

  constructor(private dialogFactoryService: DialogFactoryService,
    private platformsService: PlatformsService,
    private router: Router) {
  }

  ngOnInit() {
    console.log('platforms!');
    this.getPlatform(0);
  }

  public formSubmitted(data: any) {
    this.closeDialog();
    this.router.navigate(['platforms', data]);
  }

  public closeDialog() {
    this.dialog.close();
  }

  public dispatchNewDialog() {
    this.openDialog({
      headerText: 'Nueva plataforma',
      template: this.platformForm
    });
  }

  public search(term: string, page: number) {
    this.platformsService.getFilteredList(term, page).subscribe(result => {
      console.log('result', result);
      this.platforms = result.platforms;
    });
  }

  public pageChange(page: number) {
    this.term.length ? this.search(this.term, page) : this.getPlatform(page);
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }

  private getPlatform(page: number) {
    this.platformsService.getList(page).subscribe(result => {
      console.log('result', result);
      this.platforms = result.platforms;
      this.itemsTotal = result.count;
    });
  }


}