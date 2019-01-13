import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'let-view-container',
  template: `
    <let-view></let-view>
    <counter-container></counter-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LetViewContainer {

  ngDoCheck() {
    console.log('LetViewContainer Check Stuff');
  }
}