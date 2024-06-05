import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompaniesService } from '../../../services/companies.service';
import { Company } from '../../../models/company.model';

@Component({
  selector: 'vgdb-company-form',
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss'
})
export class CompanyFormComponent implements OnInit {

  @Input() data?: Company;
  @Output() submitted: any = new EventEmitter<any>();
  
  public companyForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private companiesService: CompaniesService) {
  }

  ngOnInit(): void {
    this.companyForm = this.createForm(this.data);
    console.log('data', this.data)
  }

  public onSubmit() {
    console.log(this.companyForm.value);
    if (!this.data) {
      this.companiesService.createCompany(this.companyForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(result.id);
      });
    } else {
      this.companiesService.updateCompany(this.data.id!, this.companyForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(true);
      });
    }
  }

  private createForm(data?: Company) {
    return this.formBuilder.group({
      name: [data?.name, Validators.required],
      founding_year: [data?.founding_year, Validators.required],
      active: [data? data.active : true, Validators.required],
      country: [data?.country],
      main_img: [data?.main_img],
      color: [data?.color],
      wikipedia: [data?.wikipedia],
      previous_names: [data?.previous_names],
      notes: [data?.notes],
      defunct_year: [data?.defunct_year],
      defunct_reason: [data?.defunct_reason],
      is_main: [data?.is_main]
    });
  }




}