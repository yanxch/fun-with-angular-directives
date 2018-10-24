import {Component} from '@angular/core';
import {of} from 'rxjs';

@Component({
  selector: 'let-view',
  templateUrl: 'let.view.html'
})
export class LetView {
  tasks$ = of(['task1', 'task2']);
  documents$ = of(['document1', 'document2']);
  loading$ = of(true);
}