import {Component} from '@angular/core';
import {LetDirective} from '../../lib/let/let.directive';
import {createHostComponentFactory, SpectatorWithHost} from '@netbasal/spectator';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';

@Component({ selector: 'custom-host', template: '' })
class CustomHostComponent {
  task$ = of('First Task');
}
​
describe('Let Directive', function () {
  let host: SpectatorWithHost<LetDirective, CustomHostComponent>;
​
  const createHost = createHostComponentFactory({
    component: LetDirective,
    host: CustomHostComponent
  });
​
  it('binds Task Observable to the context', () => {
    host = createHost(`
      <div class="test" *let="
        let task=task 
        from { 
          task: task$ | async 
        }">
        <p>Tasks: {{ task }}</p> 
      </div>
    `);
    
    host.detectChanges();
    
​    const element = host.hostDebugElement.query(By.css('p'))
    expect(element.nativeElement).toHaveText('Tasks: First Task');
  });
});