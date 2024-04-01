import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CompaniesService } from '../../services/companies.service';
import { Company } from '../../models/company.model';
import { DialogService } from '../../components/dialog/utils/dialog.service';
import { DialogFactoryService } from '../../components/dialog/utils/dialog-factory.service';


@Component({
  selector: 'vgdb-companies',
  templateUrl: './companies.page.html',
  styleUrl: './companies.page.scss'
})
export class CompaniesPage implements OnInit {

  public companies: Company[] = [];
  public dialog: DialogService;

  @ViewChild('companyForm') companyForm: TemplateRef<any>;

  constructor(private companiesService: CompaniesService,
              private dialogFactoryService: DialogFactoryService,
              private router: Router) {
  }

  ngOnInit() {
    console.log('companies!');
    this.companiesService.getList().subscribe(result => {
      console.log('result', result);
      this.companies = result.companies;
    });
  }

  public formSubmitted(data: any) {
    this.closeDialog();
    this.router.navigate(['companies', data]);
  }

  public closeDialog() {
    this.dialog.close();
  }

  public dispatchNewDialog() {
    this.openDialog({
      headerText: 'Nueva compañia',
      template: this.companyForm
    });
  }

  public search(term: string) {
    this.companiesService.getFilteredList(term).subscribe(result => {
      console.log('result', result);
      this.companies = result.companies;
    });
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }

}