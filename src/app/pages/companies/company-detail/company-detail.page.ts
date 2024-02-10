import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CompaniesService } from '../../../services/companies.service';
import { Company } from '../../../models/company.model';
import { Subscription, filter } from 'rxjs';
import { Game } from '../../../models/game.model';
import { CompanyType } from '../../../enums/company-type.enum';


@Component({
  selector: 'vgdb-company-detail',
  templateUrl: './company-detail.page.html',
  styleUrl: './company-detail.page.scss'
})
export class CompanyDetailPage implements OnInit, OnDestroy {

  public company: Company;
  public routerSubs: Subscription;
  public gamesDev: Game[] = [];
  public gamesPub: Game[] = [];
  public backgroundStyle: any;

  constructor(private companiesService: CompaniesService,
              private router: Router) {
  }

  ngOnInit() {
    this.loadCompany();

    this.routerSubs = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))  
    .subscribe((event: any) => {
      this.loadCompany();
    });
  }

  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  }

  private loadCompany() {
    const split = this.router.url.split('/');
    const id = parseInt(split[split.length - 1]);
    this.companiesService.getCompany(id).subscribe(result => {
      console.log('company', result)
      this.company = result;
      if (this.company.games && this.company.games.length) {
        this.gamesDev = this.company.games.filter(company => company.Game_Company?.type === CompanyType.developer);
        this.gamesPub = this.company.games.filter(company => company.Game_Company?.type === CompanyType.publisher);
      }
      this.backgroundStyle = this.getBackgroundStyle(this.company);
    });
  }

  private getBackgroundStyle(company: Company) {
    return {
      'background-color': company.color? company.color : 'rgb(68, 67, 67)'
    }
  }

}
