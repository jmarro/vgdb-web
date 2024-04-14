import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AwardCategory } from '../../../models/awardCategory.model';
import { AwardsCategoryService } from '../../../services/awardsCategory.service';

@Component({
  selector: 'vgdb-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit {

  @Input() data?: AwardCategory;
  @Input() awardId: number;
  @Output() submitted: any = new EventEmitter<any>();
  
  public categoryForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private awardsCategoryService: AwardsCategoryService) {
  }

  ngOnInit(): void {
    this.categoryForm = this.createForm(this.data);
    console.log('data', this.data)
  }

  public onSubmit() {
    console.log(this.categoryForm.value);
    if (!this.data) {
      this.awardsCategoryService.createCategory(this.categoryForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(result.id);
      });
    } else {
      this.awardsCategoryService.updateCategory(this.data.id!, this.categoryForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(true);
      });
    }
  }

  private createForm(data?: AwardCategory) {
    return this.formBuilder.group({
      name: [data?.name, Validators.required],
      is_main: [data? data.is_main : false, Validators.required],
      award_category_id: [this.awardId]
    });
  }
}
