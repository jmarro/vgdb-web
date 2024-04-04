import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Serie } from '../../../models/serie.model';
import { SeriesService } from '../../../services/series.service';

@Component({
  selector: 'vgdb-serie-form',
  templateUrl: './serie-form.component.html',
  styleUrl: './serie-form.component.scss'
})
export class SerieFormComponent implements OnInit {

  @Input() data?: Serie;
  @Input() franchiseId: number;
  @Output() submitted: any = new EventEmitter<any>();
  
  public serieForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private seriesService: SeriesService) {
  }

  ngOnInit(): void {
    this.serieForm = this.createForm(this.data);
    console.log('data', this.data)
  }

  public onSubmit() {
    console.log(this.serieForm.value);
    if (!this.data) {
      this.seriesService.createSerie(this.serieForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(result.id);
      });
    } else {
      this.seriesService.updateSerie(this.data.id!, this.serieForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(true);
      });
    }
  }

  private createForm(data?: Serie) {
    return this.formBuilder.group({
      name: [data?.name, Validators.required],
      is_main: [data?.is_main],
      franchise_id: [this.franchiseId]
    });
  }

}
