import {Component, ChangeDetectionStrategy} from '@angular/core';
import {of} from 'rxjs';

@Component({
  selector: 'counter-container',
  template: `
    <counter></counter>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterContainer {

  counter$ = of(100);

  ngDoCheck() {
    console.log('CounterContainer Check Stuff');
  }
}