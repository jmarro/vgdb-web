import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { Company } from '../../models/company.model';
import { DialogService } from '../../components/dialog/utils/dialog.service';
import { DialogFactoryService } from '../../components/dialog/utils/dialog-factory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vgdb-companies',
  templateUrl: './companies.page.html',
  styleUrl: './companies.page.scss'
})
export class CompaniesPage implements OnInit {

  public companies: Company[] = [];
  dialog: DialogService;

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

  public dispatchDialog() {
    this.openDialog({
      headerText: 'Nueva compañia',
      template: this.companyForm
    });
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }

  public create() {
    console.log('create')
    const newcompany: Company = {
      
      name: 'Sonic Team',
      founding_year: 1990,
      country: 'jp',
      color: '#17569b',
      main_img: 'sonic_team.png',
      ownerId: 1
    }

   /* const newcompany: Company = {
      
      name: 'Sega',
      founding_year: 1960,
      country: 'jp',
      color: '#17569b',
      main_img: 'sega.png'
    }*/
    /*const newcompany: Company = {
      
      name: 'Sega Technical Institute',
      founding_year: 1990,
       defunct_year: 1996,
       defunct_reason: 'Disuelta por Sega',
       active: false,
      country: 'us',
      color: '#17569b',
      ownerId: 1,
      main_img: 'Sega_technical_institute.jpg'
    }*/

  }

}