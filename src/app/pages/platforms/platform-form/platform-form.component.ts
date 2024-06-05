import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatformsService } from '../../../services/platforms.service';
import { Platform } from '../../../models/platform.model';

@Component({
  selector: 'vgdb-platform-form',
  templateUrl: './platform-form.component.html',
  styleUrl: './platform-form.component.scss'
})
export class PlatformFormComponent implements OnInit {

  @Input() data?: Platform;
  @Output() submitted: any = new EventEmitter<any>();
  
  public platformForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private platformsService: PlatformsService) {
  }

  ngOnInit(): void {
    this.platformForm = this.createForm(this.data);
    console.log('data', this.data)
  }

  public onSubmit() {
    console.log(this.platformForm.value);
    if (!this.data) {
      this.platformsService.createPlatform(this.platformForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(result.id);
      });
    } else {
      this.platformsService.updatePlatform(this.data.id!, this.platformForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(true);
      });
    }
  }

  private createForm(data?: Platform) {
    return this.formBuilder.group({
      name: [data?.name, Validators.required],
      release_date: [data?.release_date, Validators.required],
      color: [data?.color],
      main_img: [data?.main_img],
      mini_logo: [data?.mini_logo],
      img: [data?.img],
      gen: [data?.gen, Validators.required],
      type: [data? data.type : 'desktop', Validators.required],
      specs: [data?.specs],
      alt_names: [data?.alt_names],
      wikipedia: [data?.wikipedia],
      is_main: [data?.is_main]
    });
  }
}
