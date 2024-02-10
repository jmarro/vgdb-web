import { Component, OnInit } from '@angular/core';
import { ThemesService } from '../../services/themes.service';
import { Theme } from '../../models/theme.model';

@Component({
  selector: 'vgdb-themes',
  templateUrl: './themes.page.html',
  styleUrl: './themes.page.scss'
})
export class ThemesPage implements OnInit {

  public themes: Theme[] = [];

  constructor(private themesService: ThemesService) {
  }

  ngOnInit() {
    console.log('themes!');
    this.themesService.getList().subscribe(result => {
      console.log('result', result);
      this.themes = result.themes;
    });
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