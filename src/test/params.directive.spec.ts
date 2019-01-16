import {Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SpectatorWithHost, createHostComponentFactory} from '@netbasal/spectator';
import {ParamsDirective} from '../../lib/router/params.directive';
import {By} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({ selector: 'custom-host', template: '' })
class ParamsDirectiveHost {
  taskSubject = new BehaviorSubject('First Task');
  task$ = this.taskSubject.asObservable();

  constructor() {
    setTimeout(() => this.taskSubject.next('Second Task'), 900);
  }
}

class MockedActivatedRoute {

  paramMap = new BehaviorSubject({
    params: {
      usernameParam: 'testValue',
      xxxParam: 'testValue2'
    }
  });

  constructor() {}
}

describe('Params Directive', function () {
  let host: SpectatorWithHost<ParamsDirective, ParamsDirectiveHost>;
​
  const createHost = createHostComponentFactory({
    component: ParamsDirective,
    host: ParamsDirectiveHost,
    componentProviders: [
      { provide: ActivatedRoute, useClass: MockedActivatedRoute }
    ]
  });
  
  it('binds the Template Variable to "testValue"', () => {
    // 
    // Given
    host = createHost(`
      <div *params="let username=usernameParam">
        <p>Route Param: {{username}}</p> 
      </div>
    `);
    //
    // When
    host.detectChanges();
    //
    // Then
    const p = host.hostDebugElement.query(By.css('p')).nativeElement;
    expect(p).toHaveText('Route Param: testValue');
  });
});