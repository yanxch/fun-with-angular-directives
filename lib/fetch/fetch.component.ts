import {Component, TemplateRef, ViewContainerRef, Input, OnInit, OnDestroy, ComponentFactoryResolver, Directive} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'Fetch',
  template: `
    <ng-content></ng-content>
  `
})
export class Fetch {
  // Maybe we can validate the directives in here?
  // Otherwise it just makes a better DSL
}
