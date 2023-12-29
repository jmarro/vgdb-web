import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vgdb-items-list',
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss'
})
export class ItemsListComponent implements OnInit {

  @Input() itemsList: any[];
  @Input() navigateTo: string;
  @Input() imgPath: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public navigateToFn(id: string) {
    this.router.navigate([this.navigateTo, id]);
  }

}