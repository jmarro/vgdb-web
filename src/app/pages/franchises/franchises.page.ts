import { Component, OnInit } from '@angular/core';
import { Franchise } from '../../models/franchise.model';
import { FranchisesService } from '../../services/franchises.service';

@Component({
  selector: 'vgdb-franchises',
  templateUrl: './franchises.page.html',
  styleUrl: './franchises.page.scss'
})
export class FranchisesPage implements OnInit {
  public franchises: Franchise[] = [];

  constructor(private franchisesService: FranchisesService) {
  }

  ngOnInit() {
    console.log('franchises!');
    this.franchisesService.getList().subscribe(result => {
      console.log('result', result);
      this.franchises = result.franchises;
    });
  }

  public create() {
    console.log('create')
    const newplatform: Franchise = {
      name: 'Sonic the Hedgehog',
      color: '#17569b',
      ownerId: 1,
      first_game_date: new Date('06/23/1991'),
      main_img: 'sonic_the_hedgehog.png'
    }
    this.franchisesService.createFranchise(newplatform).subscribe(result => {
      console.log('ok??', result)
    })
  }

}