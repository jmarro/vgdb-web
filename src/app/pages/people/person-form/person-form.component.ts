import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../../models/person.model';
import { PeopleService } from '../../../services/people.service';

@Component({
  selector: 'vgdb-person-form',
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss'
})
export class PersonFormComponent implements OnInit {

  @Input() data?: Person;
  @Output() submitted: any = new EventEmitter<any>();
  
  public personForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private peopleService: PeopleService) {
  }

  ngOnInit(): void {
    this.personForm = this.createForm(this.data);
    console.log('data', this.data)
  }

  public onSubmit() {
    console.log(this.personForm.value);
    if (!this.data) {
      this.peopleService.createPerson(this.personForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(result.id);
      });
    } else {
      this.peopleService.updatePerson(this.data.id!, this.personForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(true);
      });
    }
  }

  private createForm(data?: Person) {
    return this.formBuilder.group({
      name: [data?.name, Validators.required],
      birthday: [data?.birthday, Validators.required],
      nationality: [data?.nationality],
      main_img: [data?.main_img],
      wikipedia: [data?.wikipedia],
      is_main: [data?.is_main]
    });
  }
}
