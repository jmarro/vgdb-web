import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vgdb-avatars-list',
  templateUrl: './avatars-list.component.html',
  styleUrl: './avatars-list.component.scss'
})
export class AvatarsListComponent implements OnInit {

  @Input() avatarsList: any[];
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