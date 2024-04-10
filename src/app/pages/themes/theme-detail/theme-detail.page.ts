import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Theme } from '../../../models/theme.model';
import { ThemesService } from '../../../services/themes.service';
import { DialogFactoryService } from '../../../components/dialog/utils/dialog-factory.service';
import { DialogService } from '../../../components/dialog/utils/dialog.service';

@Component({
  selector: 'vgdb-theme-detail',
  templateUrl: './theme-detail.page.html',
  styleUrl: './theme-detail.page.scss'
})
export class ThemeDetailPage implements OnInit, OnDestroy {

  public theme: Theme;
  public routerSubs: Subscription;
  public backgroundStyle: any;

  public dialog: DialogService;
  
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;
  @ViewChild('themeForm') themeForm: TemplateRef<any>;
  @ViewChild('subthemeForm') subthemeForm: TemplateRef<any>;

  constructor(private dialogFactoryService: DialogFactoryService,
    private themesService: ThemesService,
    private router: Router) {
  }

  ngOnInit() {
    this.loadTheme();
    console.log('themeDetail!');
    this.routerSubs = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))  
    .subscribe((event: any) => {
      console.log('hpl')
      this.loadTheme();
    });
  }

  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  }

  public formSubmitted() {
    this.closeDialog();
    this.loadTheme();
  }

  public closeDialog() {
    this.dialog.close();
  }

  public deleteTheme() {
    this.closeDialog();
    this.themesService.deleteTheme(this.theme.id!).subscribe(result => {
      this.router.navigate(['themes']);
    });
  }

  public presentEditDialog() {
    this.openDialog({
      headerText: 'Editar temática',
      template: this.themeForm,
      context: this.theme
    });
  }

  public presentNewSubDialog() {
    this.openDialog({
      headerText: 'Añadir subtemática',
      template: this.subthemeForm,
      context: this.theme
    });
  }


  public presentDeleteDialog() {
    this.openDialog({
      headerText: 'Eliminar temática',
      template: this.deleteDialog
    });
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }

  private loadTheme() {
    const split = this.router.url.split('/');
    const id = parseInt(split[split.length - 1]);
    this.themesService.getTheme(id).subscribe(result => {
      console.log('theme', result)
      this.theme = result;
      this.backgroundStyle = this.getBackgroundStyle(this.theme);
    });
  }

  private getBackgroundStyle(theme: Theme) {
    return {
      'background-image': theme.main_img? 'url(http://localhost:3000/images/themes/'+ theme.main_img+')' : ''
    }
  }

}