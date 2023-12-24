import { Component, OnInit } from '@angular/core';
import { Platform } from '../../models/platform.model';
import { PlatformsService } from '../../services/platforms.service';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.page.html',
  styleUrl: './platforms.page.scss'
})
export class PlatformsPage implements OnInit {

  public platforms: Platform[] = [];

  constructor(private platformsService: PlatformsService) {
  }

  ngOnInit() {
    console.log('platforms!');
    this.platformsService.getList().subscribe(result => {
      console.log('result', result);
      this.platforms = result.platforms;
    });
    
  }

  public create() {
    console.log('create')
    const newplatform: Platform = {
      
      name: 'Mega Drive',
      release_date: new Date('10/29/1988'),
      color: '#4d4d4d',
      manufacturerId: 1,
      logo: 'sega/megadrive/logo.png',
      mini_logo: 'sega/megadrive/mini_logo.png',
      img: 'sega/megadrive/main_img.jpeg',
      gen: 4,
      specs: '<ul><li>16 bits</li><li>Cartuchos</li></ul>',
      type: 'Sobremesa',
      alt_names: 'Genesis (América)'
    }
    this.platformsService.createPlatform(newplatform).subscribe(result => {
      console.log('ok??', result)
    })
  }


}