import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Award } from '../../../models/award.model';
import { AwardsService } from '../../../services/awards.service';
import { AwardCategory } from '../../../models/awardCategory.model';

@Component({
  selector: 'vgdb-award-detail',
  templateUrl: './award-detail.page.html',
  styleUrl: './award-detail.page.scss'
})
export class AwardDetailPage implements OnInit, OnDestroy {

  public award: Award;
  public routerSubs: Subscription;
  public backgroundStyle: any;

  constructor(private awardsService: AwardsService,
    private router: Router) {
  }

  ngOnInit() {
    this.loadAward();
    console.log('awardDet!');
    this.routerSubs = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))  
    .subscribe((event: any) => {
      this.loadAward();
    });
  }

  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  }

  private loadAward() {
    const split = this.router.url.split('/');
    const id = parseInt(split[split.length - 1]);
    this.awardsService.getAward(id).subscribe(result => {
      console.log('award', result)
      this.award = result;
    });
  }

  public create() {
    console.log('create')
    const newplatform: AwardCategory = {
      name: 'Game of the Year',
      is_main: true,
      award_category_id: this.award.id!,
    }
    this.awardsService.createAwardCategory(newplatform).subscribe(result => {
      console.log('ok??', result)
    })
  }

}