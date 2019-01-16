import {Component} from '@angular/core';
import {LetDirective} from '../../lib/let/let.directive';
import {createHostComponentFactory, SpectatorWithHost} from '@netbasal/spectator';
import {of, BehaviorSubject} from 'rxjs';
import {By} from '@angular/platform-browser';
import {tick, fakeAsync} from '@angular/core/testing';

@Component({ selector: 'custom-host', template: '' })
class LetDirectiveHost {
  taskSubject = new BehaviorSubject('First Task');
  task$ = this.taskSubject.asObservable();

  constructor() {
    setTimeout(() => this.taskSubject.next('Second Task'), 900);
  }
}
​
describe('Let Directive', function () {
  let host: SpectatorWithHost<LetDirective, LetDirectiveHost>;
​
  const createHost = createHostComponentFactory({
    component: LetDirective,
    host: LetDirectiveHost
  });
​
  it('binds the Template Variable to "First Task"', () => {
    // 
    // Given
    host = createHost(`
      <div class="test" *let="
        let task=task 
        from { 
          task: task$ | async 
        }">
        <p>Tasks: {{ task }}</p> 
      </div>
    `);
    //
    // When
    host.detectChanges();
    // Then
​    const p = host.hostDebugElement.query(By.css('p')).nativeElement;
    expect(p).toHaveText('Tasks: First Task');
  });

  it('updates the Template Variable to "Second Task" after one second', fakeAsync(() => {
    // 
    // Given
    host = createHost(`
      <div *let="
        let task=task 
        from { 
          task: task$ | async 
        }">
        <p>Tasks: {{ task }}</p> 
      </div>
    `);
    //
    // When
    tick(1000);
    host.detectChanges();
    //
    // Then
​    const p = host.hostDebugElement.query(By.css('p')).nativeElement;
    expect(p).toHaveText('Tasks: Second Task');
  }));
});