import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

const LIMIT_PER_PAGE = 18;

@Component({
  selector: 'vgdb-avatars-list',
  templateUrl: './avatars-list.component.html',
  styleUrl: './avatars-list.component.scss'
})
export class AvatarsListComponent implements OnInit, OnChanges {

  @Input() avatarsList: any[];
  @Input() itemsTotal: number;
  @Input() navigateTo: string;
  @Input() imgPath: string;

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  public totalPages = 1;
  public pageSize = LIMIT_PER_PAGE;
  public pageIndex: number;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.resetPages();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['itemsTotal']) {
      this.resetPages();
    }
  }

  public handlePageEvent(event: any) {
    this.onPageChange.emit(event.pageIndex);
  }

  public navigateToFn(id: string) {
    this.router.navigate([this.navigateTo, id]);
  }

  private resetPages() {
    this.pageIndex = 0;
    this.totalPages = Math.ceil(this.itemsTotal/LIMIT_PER_PAGE);
  }

}