import {OnInit, Input, Component} from '@angular/core';


@Component({
  selector: 'let-component',
  template: `
    <p>Tasks:</p> {{ tasks | json }}
    <p>Documents:</p> {{ documents | json }}
    <p>Loading:</p> {{ loading }}
  `
})
export class LetComponent {
  @Input()
  tasks: any;

  @Input()
  documents: any;

  @Input()
  loading: boolean;

  ngDoCheck() {
    console.log('LetComponent Check Stuff');
  }
}