import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vgdb-common-list-header',
  templateUrl: './common-list-header.component.html',
  styleUrl: './common-list-header.component.scss'
})
export class CommonListHeaderComponent implements OnInit {

  @Output() dialogNewOpen: EventEmitter<boolean> = new EventEmitter();
  @Output() toSearch: EventEmitter<string> = new EventEmitter();

  public searchTerm: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public dispatchDialog() {
    this.dialogNewOpen.emit(true);
  }

  public search() {
    this.toSearch.emit(this.searchTerm);
  }

  public keyup(event: any) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

}