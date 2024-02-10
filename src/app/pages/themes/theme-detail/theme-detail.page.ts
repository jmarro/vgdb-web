import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Theme } from '../../../models/theme.model';
import { ThemesService } from '../../../services/themes.service';

@Component({
  selector: 'vgdb-theme-detail',
  templateUrl: './theme-detail.page.html',
  styleUrl: './theme-detail.page.scss'
})
export class ThemeDetailPage implements OnInit, OnDestroy {

  public theme: Theme;
  public routerSubs: Subscription;
  public backgroundStyle: any;

  constructor(private themesService: ThemesService,
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