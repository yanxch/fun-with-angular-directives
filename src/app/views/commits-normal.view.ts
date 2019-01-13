import {Component} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {filter, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'commits-normal-view',
  template: `
    <commits-container
      [username]="username$ | async">
    </commits-container>
  `
})
export class CommitsNormalView {

  username$: Observable<string>;

  constructor(private route: ActivatedRoute) {
    this.username$ = this.route.paramMap
      .pipe(
        filter(p => p.has('username')),
        map(p => p.get('username')),
        tap(u => console.log(u))
      );
  }
}