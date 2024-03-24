import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompaniesService } from '../../../services/companies.service';

@Component({
  selector: 'vgdb-company-form',
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss'
})
export class CompanyFormComponent implements OnInit {

  @Input() itemsList: any[];
  @Output() submitted: any = new EventEmitter<any>();
  
  public companyForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private companiesService: CompaniesService) {
  }

  ngOnInit(): void {
    this.companyForm = this.createForm();
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.companyForm.value);
    this.companiesService.createCompany(this.companyForm.value).subscribe(result => {
      console.log('ok??', result)
      this.submitted.emit(result.id);
    });
  }

  createForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      founding_year: ['', Validators.required],
      active: [true, Validators.required],
      country: [''],
      main_img: [''],
      color: [''],
      wikipedia: [''],
      previous_names: [''],
      defunct_year: [''],
      defunct_reason: ['']
    });
  }




}