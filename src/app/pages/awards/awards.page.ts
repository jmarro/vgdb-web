import { Component, OnInit } from '@angular/core';
import { AwardsService } from '../../services/awards.service';
import { Award } from '../../models/award.model';

@Component({
  selector: 'vgdb-awards',
  templateUrl: './awards.page.html',
  styleUrl: './awards.page.scss'
})
export class AwardsPage implements OnInit {

  public awards: Award[] = [];

  constructor(private awardsService: AwardsService) {
  }

  ngOnInit() {
    console.log('awards!');
    this.awardsService.getList().subscribe(result => {
      console.log('result', result);
      this.awards = result.awards;
    });
  }

  public create() {
    console.log('create')
    const newplatform: Award = {
      name: 'Golden Joystick Awards',
      main_img: 'Golden_Joystick_Award.png',
      is_main: true
    }
    this.awardsService.createAward(newplatform).subscribe(result => {
      console.log('ok??', result)
    })
  }


}