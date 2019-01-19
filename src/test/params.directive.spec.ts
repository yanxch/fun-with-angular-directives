import {Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SpectatorWithHost, createHostComponentFactory} from '@netbasal/spectator';
import {ParamsDirective} from '../../lib/router/params.directive';
import {By} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {tick, fakeAsync} from '@angular/core/testing';

@Component({ selector: 'custom-host', template: '' })
class ParamsDirectiveHost {
  constructor() {}
}

class MockedActivatedRoute {

  paramMap = new BehaviorSubject({
    params: {
      usernameParam: 'testValue',
      xxxParam: 'testValue2'
    }
  });

  constructor() {
    setTimeout(() => {
      this.paramMap.next({
        params: {
          usernameParam: 'New Value',
          xxxParam: 'testValue2'
        }
      })
    }, 900);
  }
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

  it('updates the Template Variable to "Test Value 2"', fakeAsync(() => {
    // 
    // Given
    host = createHost(`
      <div *params="let username=usernameParam">
        <p>Route Param: {{username}}</p> 
      </div>
    `);
    //
    // When
    tick(1000);
    host.detectChanges();
    //
    // Then
    const p = host.hostDebugElement.query(By.css('p')).nativeElement;
    expect(p).toHaveText('Route Param: New Value');
  }));
});