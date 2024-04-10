import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Genre } from '../../../models/genre.model';
import { GenresService } from '../../../services/genres.service';
import { DialogService } from '../../../components/dialog/utils/dialog.service';
import { DialogFactoryService } from '../../../components/dialog/utils/dialog-factory.service';

@Component({
  selector: 'vgdb-genre-detail',
  templateUrl: './genre-detail.page.html',
  styleUrl: './genre-detail.page.scss'
})
export class GenreDetailPage implements OnInit, OnDestroy {

  public genre: Genre;
  public routerSubs: Subscription;
  public backgroundStyle: any;

  public dialog: DialogService;
  
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;
  @ViewChild('genreForm') genreForm: TemplateRef<any>;
  @ViewChild('subgenreForm') subgenreForm: TemplateRef<any>;

  constructor(private dialogFactoryService: DialogFactoryService,
    private genresService: GenresService,
    private router: Router) {
  }

  ngOnInit() {
    this.loadGenre();
    console.log('genreDetail!');
    this.routerSubs = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))  
    .subscribe((event: any) => {
      this.loadGenre();
    });
  }

  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  }

  public formSubmitted() {
    this.closeDialog();
    this.loadGenre();
  }

  public closeDialog() {
    this.dialog.close();
  }

  public deleteGenre() {
    this.closeDialog();
    this.genresService.deleteGenre(this.genre.id!).subscribe(result => {
      this.router.navigate(['genres']);
    });
  }

  public presentEditDialog() {
    this.openDialog({
      headerText: 'Editar género',
      template: this.genreForm,
      context: this.genre
    });
  }

  public presentNewSubDialog() {
    this.openDialog({
      headerText: 'Añadir subgénero',
      template: this.subgenreForm,
      context: this.genre
    });
  }

  public presentDeleteDialog() {
    this.openDialog({
      headerText: 'Eliminar género',
      template: this.deleteDialog
    });
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
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