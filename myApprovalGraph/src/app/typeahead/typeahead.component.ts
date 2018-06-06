/**
 * Typeahead component
 * USAGE:
 *
 * //Property declaration
 * options: Array<string> = [];
 *
 * //Search method
 * search(searchTerm) {
 *   console.log(searchTerm);
 *   //service should fetch data here, google api is used for demo
 *   const data = this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}`)
 *   .map(res => res.json());
 *
 *   data.subscribe(response => {
 *     this.options = response.results;
 *     console.log(this.options, response);
 *  });
 * }
 *
 * <!-- Template inclusion -->
 * <af-typeahead (searchEvent)="search($event)" (selectEvent)="search($event)"  [options]="options"></af-typeahead>
 */

import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'af-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent implements OnInit, OnChanges {

  @ViewChild('inputSearch')
  inputSearch: ElementRef;
  public searchTerm: string;
  searchedTerm:string;
  private _options: Array<any> = [];
  private _selectedInInput: any;

  @Input()
  typeAheadOptions: TemplateRef<any>;

  @Input() set options(values: Array<any>) {
    this._options = values;
  }

  get options(): Array<any> {
    return this._options;
  }

  showLoadingIcon = false;

  @Input() noResultsFound: boolean;
  @Input() promptText = 'Search...';
  @Input() delay = 200;
  @Input() minSearchChars = 2;
  @Input() labelField: string;
  @Input() isTypeAheadDisabled: boolean;
  @Input() limitExceededMessage: string;
  @Input() isLimitExceeded:string;
  @Input() widgetSize: string;
  @Input() helpText: string = '';
  @Input() isGBTheme: boolean;
  @Input() showSelectedInInput: boolean = false;
  private _triggerSearch: boolean = false;

  @Output() searchEvent: EventEmitter<string> = new EventEmitter();
  @Output() selectEvent: EventEmitter<any> = new EventEmitter();

  @Input() set triggerSearch( trigger: boolean) {
    this._triggerSearch = trigger;
    if (trigger == true && this.searchedTerm) {
      this.searchEvent.emit(this.searchTerm);
      this.showLoadingIcon = true;
    }
  }

 get triggerSearch() {
    return this._triggerSearch;
  }

  @Input() set selectedInInput(value: any) {
    this._selectedInInput = value;
    if (this.showSelectedInInput) {
      this.searchTerm = this.selectedInInput;
    }
  }
  get selectedInInput() {
    return this._selectedInInput;
  }

  constructor(private inputElementRef: ElementRef) {
    const eventStream = Observable.fromEvent(inputElementRef.nativeElement, 'keyup')
      .filter((event: KeyboardEvent) =>
        !([37, 38, 39, 40].indexOf(event.keyCode) > -1) // Filter arrow keys
      )
      .debounceTime(this.delay)
      .map((event: KeyboardEvent) => {
        const inputElement: HTMLInputElement = <HTMLInputElement>(event && event.target);
        return inputElement && inputElement.value;
      })
      .filter(searchedTerm => {
        const isValidSearchedTerm: boolean = !!searchedTerm &&
          searchedTerm.trim().length >= this.minSearchChars;
        if (!isValidSearchedTerm) {
        // Empty dropdown results if new search text is not valid
          this._options = [];
         }
        return isValidSearchedTerm;
      });

    eventStream.subscribe(searchedTerm => {
      this.searchedTerm = searchedTerm;
      this.searchEvent.emit(searchedTerm);
      this.showLoadingIcon = true;
    });
  }

  ngOnInit() {

   }

  ngOnChanges() {
    this.showLoadingIcon = false;
  }

  selectItem(item: any) {
    this._options.length = 0;
    this.searchTerm = item;
    this.selectEvent.emit(item);
    this.searchTerm = '';
  }

  emptySearchResults(): void {
    if (this.inputSearch && this.inputSearch.nativeElement) {
      // Reset the search results, part of PFD-5997/PFD-5998
      this._options = [];
    }
  }

  resetLoading() {
    this.showLoadingIcon = false;
  }

  clearSearch() {
    this.searchTerm = '';
    this.showLoadingIcon = false;
  }

  filterMdsSelectedData(value: any, labelField: string) {
    if (typeof value === 'object') {
      if (value[labelField]) {
        return value[labelField];
      } else {
        return value.toString();
      }
    } else {
      return value;
    }
  }

}
