import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Genre } from '../../../models/genre.model';
import { GenresService } from '../../../services/genres.service';

@Component({
  selector: 'vgdb-genre-form',
  templateUrl: './genre-form.component.html',
  styleUrl: './genre-form.component.scss'
})
export class GenreFormComponent implements OnInit {

  @Input() data?: Genre;
  @Input() parentGenreId?: number;
  @Output() submitted: any = new EventEmitter<any>();
  
  public genreForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private genresService: GenresService) {
  }

  ngOnInit(): void {
    this.genreForm = this.createForm(this.data);
    console.log('data', this.data)
  }

  public onSubmit() {
    console.log(this.genreForm.value);
    if (!this.data) {
      this.genresService.createGenre(this.genreForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(result.id);
      });
    } else {
      this.genresService.updateGenre(this.data.id!, this.genreForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(true);
      });
    }
  }

  private createForm(data?: Genre) {
    let parentId = this.parentGenreId;
    parentId = parentId ? parentId : data?.parentId;
    return this.formBuilder.group({
      name: [data?.name, Validators.required],
      main_img: [data?.main_img],
      parentId: [parentId]
    });
  }
}
