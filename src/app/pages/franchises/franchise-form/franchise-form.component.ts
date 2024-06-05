import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Franchise } from '../../../models/franchise.model';
import { FranchisesService } from '../../../services/franchises.service';

@Component({
  selector: 'vgdb-franchise-form',
  templateUrl: './franchise-form.component.html',
  styleUrl: './franchise-form.component.scss'
})
export class FranchiseFormComponent implements OnInit {

  @Input() data?: Franchise;
  @Output() submitted: any = new EventEmitter<any>();
  
  public franchiseForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private franchisesService: FranchisesService) {
  }

  ngOnInit(): void {
    this.franchiseForm = this.createForm(this.data);
    console.log('data', this.data)
  }

  public onSubmit() {
    console.log(this.franchiseForm.value);
    if (!this.data) {
      this.franchisesService.createFranchise(this.franchiseForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(result.id);
      });
    } else {
      this.franchisesService.updateFranchise(this.data.id!, this.franchiseForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(true);
      });
    }
  }

  private createForm(data?: Franchise) {
    return this.formBuilder.group({
      name: [data?.name, Validators.required],
      main_img: [data?.main_img],
      color: [data?.color],
      wikipedia: [data?.wikipedia],
      first_game_date: [data?.first_game_date],
      is_main: [data?.is_main]
    });
  }

}
