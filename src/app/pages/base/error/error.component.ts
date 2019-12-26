import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  error = {
    403: {status: 403, title: 403, subTitle: 'Sorry, you are not authorized to access this page.'},
    404: {status: 404, title: 404, subTitle: 'Sorry, the page you visited does not exist.'},
    500: {status: 500, title: 500, subTitle: 'Sorry, there is an error on server.'},
  };

  errorInfo = this.error['404'];

  constructor(public route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('ErrorComponent-ngOnInit');
    this.route.params.subscribe((res: any) => {
      if (res.status) {
        this.errorInfo = this.error[res.status];
      }
    });
  }

}
