import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {

  @Input() searchBody: object;
  @Input() searchFunction: any;

  constructor() {
  }

  clear = (): void => {
    Object.keys(this.searchBody).forEach((key) => {
      this.searchBody[key] = null;
    });
  };

  doSearch = (): void => {
    this.searchFunction();
  };


}
