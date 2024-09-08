import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ThemesService } from '../../services/themes.service';
import { Theme } from '../../models/theme.model';
import { DialogService } from '../../components/dialog/utils/dialog.service';
import { DialogFactoryService } from '../../components/dialog/utils/dialog-factory.service';

@Component({
  selector: 'vgdb-themes',
  templateUrl: './themes.page.html',
  styleUrl: './themes.page.scss'
})
export class ThemesPage implements OnInit {

  public themes: Theme[] = [];
  public dialog: DialogService;
  public itemsTotal: number;
  public term = '';

  @ViewChild('themeForm') themeForm: TemplateRef<any>;

  constructor(private dialogFactoryService: DialogFactoryService,
    private themesService: ThemesService,
    private router: Router) {
  }

  ngOnInit() {
    console.log('themes!');
    this.getThemes(0);
  }

  public formSubmitted(data: any) {
    this.closeDialog();
    this.router.navigate(['themes', data]);
  }

  public closeDialog() {
    this.dialog.close();
  }

  public dispatchNewDialog() {
    this.openDialog({
      headerText: 'Nueva temática',
      template: this.themeForm
    });
  }

  public search(term: string, page: number) {
    this.term = term;
    this.themesService.getFilteredList(term, page).subscribe(result => {
      console.log('result', result);
      this.themes = result.themes;
    });
  }

  public pageChange(page: number) {
    this.term.length ? this.search(this.term, page) : this.getThemes(page);
  }

  public navigateTo(event: any) {
    this.router.navigate(['themes', event]);
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }

  private getThemes(page: number) {
    this.themesService.getList(page).subscribe(result => {
      console.log('result', result);
      this.themes = result.themes;
      this.itemsTotal = result.count;
    });
  }

}