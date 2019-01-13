import {Component, ChangeDetectionStrategy} from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';

@Component({
  selector: 'let-view-container-2',
  template: `
    <let-component
      [tasks]="tasks$ | async"
      [documents]="documents$ | async"
      [loading]="loading$ | async">
    </let-component>
    <counter-container></counter-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LetView2Container {

  _tasks$ = new BehaviorSubject('task1');


  tasks$ = this._tasks$.asObservable();

  documents$ = of(['document1', 'document2']);
  loading$ = of(true);


  constructor() {
    setTimeout(() => this._tasks$.next('task2'), 2000);
  }

  ngDoCheck() {
    console.log('LetView2Container Check Stuff');
  }
}