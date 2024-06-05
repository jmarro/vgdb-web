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
  public itemsTotal: number;
  public term = '';

  @ViewChild('genreForm') genreForm: TemplateRef<any>;

  constructor(private dialogFactoryService: DialogFactoryService,
    private genresService: GenresService,
    private router: Router) {
  }

  ngOnInit() {
    console.log('genres!');
    this.getGenres(0);
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

  public search(term: string, page: number) {
    this.genresService.getFilteredList(term, page).subscribe(result => {
      console.log('result', result);
      this.genres = result.genres;
    });
  }

  public pageChange(page: number) {
    this.term.length ? this.search(this.term, page) : this.getGenres(page);
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }

  private getGenres(page: number) {
    this.genresService.getList(page).subscribe(result => {
      console.log('result', result);
      this.genres = result.genres;
      this.itemsTotal = result.count;
    });
  }

}
