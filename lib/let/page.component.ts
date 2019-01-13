import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'Page',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page {
  // Maybe we can validate the directives in here?
  // Otherwise it just makes a better DSL
}