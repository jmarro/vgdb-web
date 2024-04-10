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

  @ViewChild('themeForm') themeForm: TemplateRef<any>;

  constructor(private dialogFactoryService: DialogFactoryService,
    private themesService: ThemesService,
    private router: Router) {
  }

  ngOnInit() {
    console.log('themes!');
    this.themesService.getList().subscribe(result => {
      console.log('result', result);
      this.themes = result.themes;
    });
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

  public search(term: string) {
    this.themesService.getFilteredList(term).subscribe(result => {
      console.log('result', result);
      this.themes = result.themes;
    });
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }
  public create() {
    console.log('create')
    const newplatform: Theme = {
      name: 'Historico',
      main_img: 'historical/historical.jpg'
    }
    this.themesService.createTheme(newplatform).subscribe(result => {
      console.log('ok??', result)
    })
  }


}