import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Genre } from '../../models/genre.model';
import { GenresService } from '../../services/genres.service';
import { DialogService } from '../../components/dialog/utils/dialog.service';
import { DialogFactoryService } from '../../components/dialog/utils/dialog-factory.service';


@Component({
  selector: 'vgdb-genres',
  templateUrl: './genres.page.html',
  styleUrl: './genres.page.scss'
})
export class GenresPage implements OnInit {

  public dialog: DialogService;
  public genres: Genre[] = [];

  @ViewChild('genreForm') genreForm: TemplateRef<any>;

  constructor(private dialogFactoryService: DialogFactoryService,
    private genresService: GenresService,
    private router: Router) {
  }

  ngOnInit() {
    console.log('genres!');
    this.genresService.getList().subscribe(result => {
      console.log('result', result);
      this.genres = result.genres;
    });
  }

  public formSubmitted(data: any) {
    this.closeDialog();
    this.router.navigate(['genres', data]);
  }

  public closeDialog() {
    this.dialog.close();
  }

  public dispatchNewDialog() {
    this.openDialog({
      headerText: 'Nuevo género',
      template: this.genreForm
    });
  }

  public search(term: string) {
    this.genresService.getFilteredList(term).subscribe(result => {
      console.log('result', result);
      this.genres = result.genres;
    });
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
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