import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '../../../models/platform.model';
import { PlatformsService } from '../../../services/platforms.service';
import { Subscription, filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'vgdb-platform-detail',
  templateUrl: './platform-detail.page.html',
  styleUrl: './platform-detail.page.scss'
})
export class PlatformDetailPage implements OnInit, OnDestroy {

  public platform: Platform;
  public routerSubs: Subscription;

  constructor(private platformsService: PlatformsService,
              private router: Router) {
  }

  ngOnInit() {
    this.loadPlatform();

    this.routerSubs = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))  
    .subscribe((event: any) => {
      this.loadPlatform();
    });
  }

  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  }

  private loadPlatform() {
    const split = this.router.url.split('/');
    const id = parseInt(split[split.length - 1]);
    this.platformsService.getPlatform(id).subscribe(result => {
      console.log('platform', result)
      this.platform = result;
    });
  }

}