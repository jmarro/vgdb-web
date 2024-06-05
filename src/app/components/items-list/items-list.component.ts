import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

const LIMIT_PER_PAGE = 9;

@Component({
  selector: 'vgdb-items-list',
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss'
})
export class ItemsListComponent implements OnInit, OnChanges {

  @Input() itemsList: any[];
  @Input() itemsTotal: number;
  @Input() navigateTo: string;
  @Input() imgPath: string;
  @Input() clickable: boolean = true;

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

  public navigateToFn(id: string) {
    if (this.clickable) {
      this.router.navigate([this.navigateTo, id]);
    }
  }

  public handlePageEvent(event: any) {
    this.onPageChange.emit(event.pageIndex);
  }

  public getYear(date: string) {
    return new Date(date).getFullYear();
  }

  private resetPages() {
    this.pageIndex = 0;
    this.totalPages = Math.ceil(this.itemsTotal/LIMIT_PER_PAGE);
  }

}