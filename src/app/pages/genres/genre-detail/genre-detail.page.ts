import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Genre } from '../../../models/genre.model';
import { GenresService } from '../../../services/genres.service';

@Component({
  selector: 'vgdb-genre-detail',
  templateUrl: './genre-detail.page.html',
  styleUrl: './genre-detail.page.scss'
})
export class GenreDetailPage implements OnInit, OnDestroy {

  public genre: Genre;
  public routerSubs: Subscription;
  public backgroundStyle: any;

  constructor(private genresService: GenresService,
    private router: Router) {
  }

  ngOnInit() {
    this.loadGenre();
    console.log('genreDetail!');
    this.routerSubs = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))  
    .subscribe((event: any) => {
      console.log('hpl')
      this.loadGenre();
    });
  }

  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  }

  private loadGenre() {
    const split = this.router.url.split('/');
    const id = parseInt(split[split.length - 1]);
    this.genresService.getGenre(id).subscribe(result => {
      console.log('genre', result)
      this.genre = result;
      this.backgroundStyle = this.getBackgroundStyle(this.genre);
    });
  }

  private getBackgroundStyle(genre: Genre) {
    return {
      'background-image': genre.main_img? 'url(http://localhost:3000/images/genres/'+ genre.main_img+')' : ''
    }
  }

}