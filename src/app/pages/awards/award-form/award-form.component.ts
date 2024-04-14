import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AwardsService } from '../../../services/awards.service';
import { Award } from '../../../models/award.model';

@Component({
  selector: 'vgdb-award-form',
  templateUrl: './award-form.component.html',
  styleUrl: './award-form.component.scss'
})
export class AwardFormComponent implements OnInit {

  @Input() data?: Award;
  @Output() submitted: any = new EventEmitter<any>();
  
  public awardForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private awardsService: AwardsService) {
  }

  ngOnInit(): void {
    this.awardForm = this.createForm(this.data);
    console.log('data', this.data)
  }

  public onSubmit() {
    console.log(this.awardForm.value);
    if (!this.data) {
      this.awardsService.createAward(this.awardForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(result.id);
      });
    } else {
      this.awardsService.updateAward(this.data.id!, this.awardForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(true);
      });
    }
  }

  private createForm(data?: Award) {
    return this.formBuilder.group({
      name: [data?.name, Validators.required],
      main_img: [data?.main_img],
      wikipedia: [data?.wikipedia],
      is_main: [data? data.is_main : false, Validators.required]
    });
  }
}
