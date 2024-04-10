import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatformModel } from '../../../models/platformModel.model';
import { ModelsService } from '../../../services/models.service';

@Component({
  selector: 'vgdb-model-form',
  templateUrl: './model-form.component.html',
  styleUrl: './model-form.component.scss'
})
export class ModelFormComponent implements OnInit {

  @Input() data?: PlatformModel;
  @Input() platformId: number;
  @Output() submitted: any = new EventEmitter<any>();
  
  public modelForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private modelsService: ModelsService) {
  }

  ngOnInit(): void {
    this.modelForm = this.createForm(this.data);
    console.log('data', this.data)
  }

  public onSubmit() {
    console.log(this.modelForm.value);
    if (!this.data) {
      this.modelsService.createModel(this.modelForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(result.id);
      });
    } else {
      this.modelsService.updateModel(this.data.id!, this.modelForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(true);
      });
    }
  }

  private createForm(data?: PlatformModel) {
    return this.formBuilder.group({
      name: [data?.name, Validators.required],
      release_date: [data?.release_date, Validators.required],
      main_img: [data?.main_img],
      platform_family_id: [this.platformId]
    });
  }

}
