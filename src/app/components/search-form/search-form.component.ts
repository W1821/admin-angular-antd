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

  clear = () => {
    Object.keys(this.searchBody).forEach((key) => {
      this.searchBody[key] = null;
    });
  };

  doSearch = () => {
    this.searchFunction();
  };


}
