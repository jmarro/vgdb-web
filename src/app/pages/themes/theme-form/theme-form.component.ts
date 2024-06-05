import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemesService } from '../../../services/themes.service';
import { Theme } from '../../../models/theme.model';

@Component({
  selector: 'vgdb-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrl: './theme-form.component.scss'
})
export class ThemeFormComponent implements OnInit {

  @Input() data?: Theme;
  @Input() parentThemeId?: number;
  @Output() submitted: any = new EventEmitter<any>();
  
  public themeForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private themesService: ThemesService) {
  }

  ngOnInit(): void {
    this.themeForm = this.createForm(this.data);
    console.log('data', this.data)
  }

  public onSubmit() {
    console.log(this.themeForm.value);
    if (!this.data) {
      this.themesService.createTheme(this.themeForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(result.id);
      });
    } else {
      this.themesService.updateTheme(this.data.id!, this.themeForm.value).subscribe(result => {
        console.log('ok??', result)
        this.submitted.emit(true);
      });
    }
  }

  private createForm(data?: Theme) {
    let parentId = this.parentThemeId;
    parentId = parentId ? parentId : data?.parentId;
    return this.formBuilder.group({
      name: [data?.name, Validators.required],
      main_img: [data?.main_img],
      parentId: [parentId],
      is_main: [data?.is_main]
    });
  }

}
