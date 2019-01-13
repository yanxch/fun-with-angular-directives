import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'counter',
  template: `
    <div>Current Count: {{ count }}</div>
    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>
    <button (click)="reset()">Reset Counter</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  @Input()
  count: number = 666;

  @Output()
  onIncrement = new EventEmitter<any>();
  @Output()
  onDecrement = new EventEmitter<any>();
  @Output()
  onReset = new EventEmitter<any>();

  constructor() {
  }

  ngDoCheck() {
    console.log('CounterComponent Check Stuff');
  }

  increment() {
    this.onIncrement.emit();
  }

  decrement() {
    this.onDecrement.emit();
  }

  reset() {
    this.onReset.emit();
  }
}