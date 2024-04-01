import {COMMA} from '@angular/cdk/keycodes';
import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {Observable, of} from 'rxjs';
import {map, mergeMap, startWith} from 'rxjs/operators';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'vgdb-multi-autocomplete-field',
  templateUrl: 'multi-autocomplete-field.component.html',
  styleUrls: ['multi-autocomplete-field.component.scss'],
})
export class MultiAutocompleteFieldComponent {

  @Input('dataType') dataType: any;
  @Input('itemsPreSelected') itemsPreSelected: any = [];
  
  @Output() onItemSelected: EventEmitter<any[]> = new EventEmitter();
  
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [COMMA];
  formCtrl = new FormControl();
  filteredItems: Observable<any[]>;
  allItems: any[] = [];
  itemsSelected: any[] = [];

  imgPath: string;
  propertyResponse: string;

  @ViewChild('itemInput', {static: false}) itemInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(private peopleService: PeopleService) {
    this.filteredItems = this.formCtrl.valueChanges.pipe(
        startWith(null),
        mergeMap(text => text? this.getFilterService(text) :  of({})),
        map((item: any) => item ? this.selectableItems(this.valuesFromFilter(item)) : this.selectableItems(this.allItems).slice()));
  }

  ngOnInit() {
    this.itemsSelected = JSON.parse(JSON.stringify(this.itemsPreSelected));
    this.onItemSelected.emit(this.itemsSelected);
    switch (this.dataType) {
      case 'person':
        this.imgPath = 'people';
        this.propertyResponse = 'people';
        this.peopleService.getList().subscribe(result => {
          this.allItems = result.people;
        });
      break;
    }
  }

  remove(item: any): void {
    const index = this.itemsSelected.indexOf(item);

    if (index >= 0) {
      this.itemsSelected.splice(index, 1);
      this.onItemSelected.emit(this.itemsSelected);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.itemsSelected.push(event.option.value);
    this.itemInput.nativeElement.value = '';
    this.onItemSelected.emit(this.itemsSelected);
    this.formCtrl.setValue(null);
  }

  private valuesFromFilter(value: any): any[] {
    return value[this.propertyResponse];
  }

  private selectableItems(items: any[]): any[] {
    if (items && items.length) {
      return items.filter(o => !this.itemsSelected.some((i: any) => i.id === o.id));
    } else {
      return [];
    }
    
  }

  private getFilterService(text: string) {
    switch (this.dataType) {
      case 'person':
        return this.peopleService.getFilteredList(text);
      break;
      default:
        return of({});
    }
  }
}