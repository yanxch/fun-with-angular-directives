import {Component} from '@angular/core';
import {Route} from '@angular/router';

@Component({
  selector: 'Route',
  template: `
    <ng-content></ng-content>
  `
})
export class RouteComponent {
  config: Route;
}