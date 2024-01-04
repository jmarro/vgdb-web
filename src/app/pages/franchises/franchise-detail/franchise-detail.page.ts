import { Component, OnDestroy, OnInit } from '@angular/core';
import { Franchise } from '../../../models/franchise.model';
import { Subscription, filter } from 'rxjs';
import { FranchisesService } from '../../../services/franchises.service';
import { NavigationEnd, Router } from '@angular/router';
import { Person } from '../../../models/person.model';
import { SeriesService } from '../../../services/series.service';
import { Serie } from '../../../models/serie.model';

@Component({
  selector: 'vgdb-franchise-detail',
  templateUrl: './franchise-detail.page.html',
  styleUrl: './franchise-detail.page.scss'
})
export class FranchiseDetailPage implements OnInit, OnDestroy {

  public franchise: Franchise;
  public routerSubs: Subscription;

  constructor(private franchisesService: FranchisesService,
    private seriesService: SeriesService,
    private router: Router) {
  }

  ngOnInit() {
    this.loadFranchise();
    console.log('franchDetail!');
    this.routerSubs = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))  
    .subscribe((event: any) => {
      this.loadFranchise();
    });
  }

  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  }

  public create() {
    console.log('create')
    const creators = [{id: 1, name: 'vla'}, {id: 2}, {id: 3}] as Person[];
    if (this.franchise && this.franchise.id) {
      this.franchisesService.addCreators(this.franchise.id, creators).subscribe(result => {
        console.log('ok??', result)
      });
    }
  }

  public createSerie() {
    console.log('create ser')
    const newplatform: Serie = {
      name: 'Sonic Genesis series',
      franchise_id: 1,
      is_main: true
    }
    this.seriesService.createSerie(newplatform).subscribe(result => {
      console.log('ok??', result)
    })
  }


  private loadFranchise() {
    const split = this.router.url.split('/');
    const id = parseInt(split[split.length - 1]);
    this.franchisesService.getFranchise(id).subscribe(result => {
      console.log('franch', result)
      this.franchise = result;
    });
  }

}