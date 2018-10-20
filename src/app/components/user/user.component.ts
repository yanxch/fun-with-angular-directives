import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'user-view',
  template: `
    <h1>Hallo {{name}}</h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserView {
  @Input() name: string;
}