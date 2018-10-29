import {Component} from '@angular/core';
import {AppState} from '../app.module';
import {DECREMENT, INCREMENT, RESET} from '../state';

@Component({
  selector: 'counter-view',
  templateUrl: 'counter.view.html'
})
export class CounterView {

  counterSelector(state: AppState) {
    return state.counter;
  }
  
  incrementActionCreator(payload) {
    return {
      type: INCREMENT
    }; 
  }

  decrementActionCreator(payload) {
    return {
      type: DECREMENT
    }; 
  }

  resetActionCreator(payload) {
    return {
      type: RESET
    }; 
  }
}