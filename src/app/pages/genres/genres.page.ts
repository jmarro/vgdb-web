import { Component, OnInit } from '@angular/core';
import { Genre } from '../../models/genre.model';
import { GenresService } from '../../services/genres.service';

@Component({
  selector: 'vgdb-genres',
  templateUrl: './genres.page.html',
  styleUrl: './genres.page.scss'
})
export class GenresPage implements OnInit {

  public genres: Genre[] = [];

  constructor(private genresService: GenresService) {
  }

  ngOnInit() {
    console.log('genres!');
    this.genresService.getList().subscribe(result => {
      console.log('result', result);
      this.genres = result.genres;
    });
  }

  public create() {
    console.log('create')
    const newplatform: Genre = {
      name: 'Plataformas 2D',
      main_img: 'platforms/2d.jpg',
      parentId: 1
    }
    this.genresService.createGenre(newplatform).subscribe(result => {
      console.log('ok??', result)
    })
  }


}