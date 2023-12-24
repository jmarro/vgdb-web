import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.page.html',
  styleUrl: './companies.page.scss'
})
export class CompaniesPage implements OnInit {

  public companies: Company[] = [];

  constructor(private companiesService: CompaniesService) {
  }

  ngOnInit() {
    console.log('companies!');
    this.companiesService.getList().subscribe(result => {
      console.log('result', result);
      this.companies = result.companies;
      this.companies.push({id:2, name:'yes', country:'mx', active:true, founding_year: 1990})
    });
    
  }

  public create() {
    console.log('create')

    const newcompany: Company = {
      
      name: 'Sega',
      founding_year: 1960,
      country: 'jp',
      color: '#17569b',
      logo: 'sega.png'
    }
    /*const newcompany: Company = {
      
      name: 'Sega Technical Institute',
      founding_year: 1990,
       defunct_year: 1996,
       defunct_reason: 'Disuelta por Sega',
       active: false,
      country: 'us',
      color: '#17569b',
      ownerId: 1,
      logo: 'Sega_technical_institute.jpg'
    }*/
    this.companiesService.createCompany(newcompany).subscribe(result => {
      console.log('ok??', result)
    })
  }

}